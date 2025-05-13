import { useEffect, useRef, useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { ReactComponent as ThumbsDown } from '../../icons/thumb-down.svg';
import { ReactComponent as ThumbsUp } from '../../icons/thumb-up.svg';
import { Analytics, InteractionAPIs, LocalStorageUtils } from '../../utils';

const ResultFeedback = ( { postId, source, setDisliked } ) => {
	const [ status, setStatus ] = useState( '' );
	const [ hasSubmitted, setHasSubmitted ] = useState( false );
	const [ showThanksMessage, setShowThanksMessage ] = useState( false );
	const yesButtonRef = useRef( null );
	const noButtonRef = useRef( null );

	const postFeedback = async () => {
		if ( status === 'helpful' || status === 'notHelpful' ) {
			InteractionAPIs.postFeedback( postId, status );
			Analytics.sendEvent( 'help_feedback_submitted', {
				label_key: 'type',
				type: status === 'helpful' ? 'positive' : 'negative',
				source,
				post_id: postId,
				page: window.location.href.toString(),
			} );
		}
	};

	useEffect( () => {
		setStatus( '' );
		noButtonRef.current.className = 'feedback-button no';
		yesButtonRef.current.className = 'feedback-button yes';
	}, [ postId ] );

	useEffect( () => {
		postFeedback();

		if ( status === 'helpful' || status === 'notHelpful' ) {
			setHasSubmitted( true );
			setShowThanksMessage( true );

			const timeout = setTimeout( () => {
				setShowThanksMessage( false );
			}, 3000 );

			return () => clearTimeout( timeout );
		}
	}, [ status ] );

	const handleFeedback = ( feedback ) => {
		if ( feedback === 'notHelpful' ) {
			setDisliked( true );
		}
		setStatus( feedback );
		LocalStorageUtils.updateFeedbackStatus( postId );
	};

	return (
		<div className="feedback-container">
			{ /* Conditionally render the question and buttons */ }
			{ ! hasSubmitted && (
				<>
					<div className="feedback-question">
						<p>
							{ __(
								'Did this result help you?',
								'wp-module-help-center'
							) }
						</p>
					</div>
					<div className="icon">
						<button
							ref={ yesButtonRef }
							onClick={ () => handleFeedback( 'helpful' ) }
						>
							<ThumbsUp />
						</button>
						<button
							onClick={ () => handleFeedback( 'notHelpful' ) }
							ref={ noButtonRef }
						>
							<ThumbsDown />
						</button>
					</div>
				</>
			) }

			{ hasSubmitted && showThanksMessage && (
				<div className="thanks-message">
					{ __(
						'Thanks for the feedback!',
						'wp-module-help-center'
					) }
				</div>
			) }
		</div>
	);
};

export default ResultFeedback;
