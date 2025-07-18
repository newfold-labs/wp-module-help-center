import { useEffect, useRef, useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { useDispatch } from 'react-redux';
import { helpcenterActions } from '../../../store/helpcenterSlice';
import { ReactComponent as ThumbsDown } from '../../icons/thumb-down.svg';
import { ReactComponent as ThumbsUp } from '../../icons/thumb-up.svg';
import { Analytics, InteractionAPIs } from '../../utils';

const ResultFeedback = ({ postId, source }) => {
	const [status, setStatus] = useState('');
	const [hasSubmitted, setHasSubmitted] = useState(false);
	const [showThanksMessage, setShowThanksMessage] = useState(false);
	const yesButtonRef = useRef(null);
	const noButtonRef = useRef(null);
	const dispatch = useDispatch();

	const postFeedback = async () => {
		if (status === 'helpful' || status === 'notHelpful') {
			InteractionAPIs.postFeedback(postId, status);
			Analytics.sendEvent('help_feedback_submitted', {
				label_key: 'type',
				type: status === 'helpful' ? 'positive' : 'negative',
				source,
				post_id: postId,
				page: window.location.href.toString(),
			});
		}
	};

	useEffect(() => {
		setStatus('');
		if (noButtonRef.current) {
			noButtonRef.current.className = 'feedback-button no';
		}
		if (yesButtonRef.current) {
			yesButtonRef.current.className = 'feedback-button yes';
		}
	}, [postId]);

	useEffect(() => {
		postFeedback();

		if (status === 'helpful' || status === 'notHelpful') {
			setHasSubmitted(true);
			setShowThanksMessage(true);

			const timeout = setTimeout(() => {
				setShowThanksMessage(false);
			}, 3000);

			return () => clearTimeout(timeout);
		}
	}, [status]);

	const handleFeedback = (feedback) => {
		if (feedback === 'notHelpful') {
			dispatch(helpcenterActions.setDisliked(true));
		}
		dispatch(
			helpcenterActions.setFeeback({
				feedbackStatus: feedback === 'helpful' ? true : false,
				postId,
			})
		);
		setStatus(feedback);
	};

	return (
		<div className="feedback-container">
			{/* Conditionally render the question and buttons */}
			{!hasSubmitted && (
				<>
					<div className="feedback-question">
						<p>
							{__(
								'Did this result help you?',
								'wp-module-help-center'
							)}
						</p>
					</div>
					<div className="icon">
						<button
							ref={yesButtonRef}
							onClick={() => handleFeedback('helpful')}
						>
							<ThumbsUp />
						</button>
						<button
							onClick={() => handleFeedback('notHelpful')}
							ref={noButtonRef}
						>
							<ThumbsDown />
						</button>
					</div>
				</>
			)}

			{hasSubmitted && showThanksMessage && (
				<div className="thanks-message">
					{__('Thanks for the feedback!', 'wp-module-help-center')}
				</div>
			)}
		</div>
	);
};

export default ResultFeedback;
