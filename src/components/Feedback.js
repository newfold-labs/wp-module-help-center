import { useEffect, useState, useRef } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
//
import { Analytics, InteractionAPIs } from '../utils';

const Feedback = ( { postId, source } ) => {
	const [ status, setStatus ] = useState( '' );
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
		if ( status === 'helpful' ) {
			yesButtonRef.current.className = 'feedback-button yes selected-yes';
			noButtonRef.current.className = 'feedback-button no';
		}
		if ( status === 'notHelpful' ) {
			noButtonRef.current.className = 'feedback-button no selected-no';
			yesButtonRef.current.className = 'feedback-button yes';
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [ status ] );

	return (
		<div className="feedback-container">
			<div className="feedback-question">
				<p>
					<b>
						{ __(
							'Did this result help you?',
							'wp-module-help-center'
						) }
					</b>
				</p>
			</div>
			<div className="icon">
				<button
					ref={ yesButtonRef }
					onClick={ () => {
						setStatus( 'helpful' );
					} }
					className="feedback-button yes"
				>
					{ status === 'helpful' && (
						<span
							className="feedback-button-emoji"
							role="img"
							aria-label="helpful"
						>
							&#129395;
						</span>
					) }
					{ __( 'Yes', 'wp-module-help-center' ) }
				</button>
				<button
					onClick={ () => {
						setStatus( 'notHelpful' );
					} }
					ref={ noButtonRef }
					className="feedback-button no"
				>
					{ status === 'notHelpful' && (
						<span
							className="feedback-button-emoji"
							role="img"
							aria-label="not helpful"
						>
							&#128557;
						</span>
					) }
					{ __( 'No', 'wp-module-help-center' ) }
				</button>
			</div>
		</div>
	);
};

export default Feedback;
