import { useEffect, useState, useRef } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { Analytics, InteractionAPIs, LocalStorageUtils } from '../utils';

const Feedback = ( { postId, source } ) => {
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

	const handleFeedback = (feedback) => {
		console.log("post ID", postId);
		setStatus( feedback );
		let savedResults = LocalStorageUtils.getResultInfo();
		console.log(savedResults);
		savedResults = savedResults.map(result => {
			if (result.postId === postId ) {
				return { ...result, feedbackSubmitted: true }; // Update or add key
			}
			return result; // Leave other posts untouched
		});
		localStorage.setItem(
			'helpResultContent',
			JSON.stringify( savedResults )
		);
	}

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
							onClick={ () =>  handleFeedback( 'helpful' ) }
							className="feedback-button yes"
						>
							{ __( 'Yes', 'wp-module-help-center' ) }
						</button>
						<button
							onClick={ () => handleFeedback( 'notHelpful' ) }
							ref={ noButtonRef }
							className="feedback-button no"
						>
							{ __( 'No', 'wp-module-help-center' ) }
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

export default Feedback;
