/* eslint-disable jsx-a11y/anchor-is-valid */
import { ReactComponent as DislikeFeedback } from '../icons/dislike-help.svg';
import { __ } from '@wordpress/i18n';

const DislikeFeedbackPanel = () => {
	return (
		<div className="dislike-feedback">
			<div className="dislike-feedback-icon">
				<DislikeFeedback />
			</div>

			<div>
				{ __(
					`We're sorry the suggestions didn’t help.`,
					'wp-module-help-center'
				) }
				<p>{ __( 'Try to:', 'wp-module-help-center' ) }</p>
				<ul>
					<li>
						{ __(
							'Use different keywords in the search field. A clear, short prompt can make the difference.',
							'wp-module-help-center'
						) }
					</li>
					<li>
						{ __(
							'Reach out to our customer support. Call at ',
							'wp-module-help-center'
						) }
						<span>
							<a href="#">888-401-4678</a>
						</span>
						{ __( ' or ', 'wp-module-help-center' ) }
						<span>
							<a href="#">Chat Live</a>
						</span>
						{ __(
							' with one of our support agents — we will assist you as soon as possible.',
							'wp-module-help-center'
						) }
					</li>
				</ul>
			</div>
		</div>
	);
};

export default DislikeFeedbackPanel;
