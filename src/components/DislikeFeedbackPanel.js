import { __, sprintf } from '@wordpress/i18n';
import { useDispatch } from 'react-redux';
import { helpcenterActions } from '../../store/helpcenterSlice';
import { ReactComponent as DislikeFeedback } from '../icons/dislike-help.svg';
import BackButton from './BackButton';
const DislikeFeedbackPanel = () => {
	const dispatch = useDispatch();
	const brandConfig = window.nfdHelpCenter?.brandConfig || {};
	const hasPhone = brandConfig.hasPhone !== false;
	const supportTemplate = hasPhone
		? ( window.nfdHelpCenter?.noResultsSupportTemplate ||
			__( 'Call at %1$s or %2$s with one of our support agents — we will assist you as soon as possible.', 'wp-module-help-center' ) )
		: ( window.nfdHelpCenter?.noResultsSupportTemplateNoPhone ||
			__( 'Or %1$s with one of our support agents — we will assist you as soon as possible.', 'wp-module-help-center' ) );
	const contactUrl =
		window.NewfoldRuntime?.linkTracker?.addUtmParams?.( brandConfig.contactUrl ) ||
		brandConfig.contactUrl ||
		'#';
	const chatLink = `<a href="${ contactUrl }" target="_blank" rel="noreferrer">${ __( 'Chat Live', 'wp-module-help-center' ) }</a>`;
	const supportMessage = hasPhone
		? sprintf( supportTemplate, `<a href="tel:${ brandConfig.phone || '8884014678' }">${ brandConfig.phoneDisplay || '888-401-4678' }</a>`, chatLink )
		: sprintf( supportTemplate, chatLink );
	return (
		<div className="dislike-feedback">
			<BackButton
				handleBackClick={() => {
					dispatch(helpcenterActions.setDisliked(false));
				}}
			/>

			<div className="dislike-feedback-icon">
				<DislikeFeedback />
			</div>

			<div>
				{__(
					`We're sorry the suggestions didn’t help.`,
					'wp-module-help-center'
				)}
				<p>{__('Try to:', 'wp-module-help-center')}</p>
				<ul>
					<li>
						{__(
							`Use different keywords in the search field.`,
							'wp-module-help-center'
						)}
						<br />
						{__(
							`A clear, short prompt can make the difference.`,
							'wp-module-help-center'
						)}
					</li>
					<li>
						{__(
							'Reach out to our customer support.',
							'wp-module-help-center'
						)}
						<br />
						<span
							dangerouslySetInnerHTML={{
								__html: supportMessage,
							}}
						/>
					</li>
				</ul>
			</div>
		</div>
	);
};

export default DislikeFeedbackPanel;
