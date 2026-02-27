/* eslint-disable @wordpress/i18n-translator-comments */
import { __, sprintf } from '@wordpress/i18n';
import { LocalStorageUtils } from '../../utils';
import { ReactComponent as NoResultIcon } from './../../icons/noresults-icon.svg';

/**
 * Allow only http/https URLs for safe use in href to prevent XSS when injecting into HTML.
 * @param {string} url - URL to validate (e.g. from nfdHelpCenter.resourceLink).
 * @return {string} The URL if safe, otherwise '#'.
 */
const getSafeResourceLink = (url) => {
	if (typeof url !== 'string') {
		return '#';
	}
	const trimmed = url.trim();
	return trimmed.startsWith('http://') || trimmed.startsWith('https://')
		? trimmed
		: '#';
};

const NoResults = ({ hasLaunchedFromTooltip, query: queryProp }) => {
	const resourceLink = getSafeResourceLink(
		window?.nfdHelpCenter?.resourceLink || '#'
	);

	// Define the content with a placeholder for the link
	const contentWithLink = __(
		'You can try searching our <a href="{link}">Resource center.</a> though to see if there’s a helpful article or video on that subject.',
		'wp-module-help-center'
	);

	// Replace the {link} placeholder with the actual link (sanitized)
	const formattedContent = contentWithLink.replace('{link}', resourceLink);
	// Use prop query if provided, otherwise try localStorage, fallback to null
	const query =
		queryProp !== undefined
			? queryProp
			: LocalStorageUtils.getSearchInput();
	// Determine the message text - use "this" if launched from tooltip or query is null/empty
	const messageText =
		hasLaunchedFromTooltip || !query ? 'this' : `"${query}"`;
	return (
		<div className="helpcenter-response-block">
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
							messageText
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
									{__(
										'Reach out to our customer support.',
										'wp-module-help-center'
									)}
									<br />
									{__(
										'Call at',
										'wp-module-help-center'
									)}{' '}
									<a href="tel:8884014678">888-401-4678</a>{' '}
									{__('or', 'wp-module-help-center')}{' '}
									<a
										href={
											window.NewfoldRuntime?.linkTracker?.addUtmParams(
												'https://www.bluehost.com/contact'
											) ||
											'https://www.bluehost.com/contact'
										}
										target="_blank"
										rel="noreferrer"
									>
										Chat Live
									</a>{' '}
									{__(
										'with one of our support agents — we will assist you as soon as possible.',
										'wp-module-help-center'
									)}
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
