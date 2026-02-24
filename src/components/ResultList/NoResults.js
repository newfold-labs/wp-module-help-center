/* eslint-disable @wordpress/i18n-translator-comments */
import { useRef } from '@wordpress/element';
import { __, sprintf } from '@wordpress/i18n';
import { LocalStorageUtils } from '../../utils';
import { ReactComponent as NoResultIcon } from './../../icons/noresults-icon.svg';

const NoResults = ( { hasLaunchedFromTooltip } ) => {
	const responseRef = useRef( null );
	const resourceLink = window?.nfdHelpCenter?.resourceLink || '#';
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

	const contentWithLink = __(
		'You can try searching our <a href="{link}">Resource center.</a> though to see if there’s a helpful article or video on that subject.',
		'wp-module-help-center'
	);

	// Replace the {link} placeholder with the actual link
	const formattedContent = contentWithLink.replace('{link}', resourceLink);
	const query = LocalStorageUtils.getSearchInput();
	return (
		<div ref={responseRef} className="helpcenter-response-block">
			<div className="helpcenter-noresult-wrapper">
				<div className="helpcenter-noresult-block">
					<div className="helpcenter-noresult-icon">
						<NoResultIcon />
					</div>
					<p>
						{sprintf(
							__(
								'Sorry, I don’t have any information on %s yet.',
								'wp-module-help-center'
							),
							hasLaunchedFromTooltip ? 'this' : `"${query}"`
						)}
					</p>
					<div>
						<h4>{__('Try to:', 'wp-module-help-center')}</h4>
						<ul>
							<li>
								<p
									dangerouslySetInnerHTML={{
										__html: formattedContent,
									}}
								/>
							</li>
							<li>
								<p>
									{__(
										`Use different keywords in the search field.`,
										'wp-module-help-center'
									)}
									<br />
									{__(
										`A clear, short prompt can make the difference.`,
										'wp-module-help-center'
									)}
								</p>
							</li>
							<li>
								<p>
									{ __(
										'Reach out to our customer support.',
										'wp-module-help-center'
									) }
									<br />
									<span
										dangerouslySetInnerHTML={ {
											__html: supportMessage,
										} }
									/>
								</p>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
};

export default NoResults;
