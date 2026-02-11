/**
 * Builds the exact same error-state message as the old help center "no results" block (NoResults.js).
 * Used when the AI chat connection has failed and the user sends a message.
 * Returns HTML so links and list items render with proper formatting in the chat.
 *
 * @param {string} userMessage - The message the user just sent (used as the query in the copy).
 * @return {string} Full fallback message as HTML (paragraphs, list, links).
 */
import { __, sprintf } from '@wordpress/i18n';

export function getConnectionFailedFallbackMessage(userMessage) {
	const messageText =
		!userMessage || !String(userMessage).trim()
			? 'this'
			: `"${String(userMessage).trim()}"`;

	const resourceUrl = window?.nfdHelpCenter?.resourceLink || '#';
	const resourceCenterLabel = __('Resource center', 'wp-module-help-center');
	const resourceLineBefore = __(
		'You can try searching our ',
		'wp-module-help-center'
	);
	const resourceLineAfter = __(
		" though to see if there's a helpful article or video on that subject.",
		'wp-module-help-center'
	);

	const primary = sprintf(
		__(
			"Sorry, I don't have any information on %s yet.",
			'wp-module-help-center'
		),
		messageText
	);
	const tryTo = __('Try to:', 'wp-module-help-center');
	const useDifferent = __(
		'Use different keywords in the search field.',
		'wp-module-help-center'
	);
	const clearShort = __(
		'A clear, short prompt can make the difference.',
		'wp-module-help-center'
	);
	const reachOut = __(
		'Reach out to our customer support.',
		'wp-module-help-center'
	);
	const callAt = __('Call at', 'wp-module-help-center');
	const orLabel = __('or', 'wp-module-help-center');
	const chatLive = __('Chat Live', 'wp-module-help-center');
	const withSupport = __(
		'with one of our support agents — we will assist you as soon as possible.',
		'wp-module-help-center'
	);

	// Build HTML for proper formatting (links, bullets). ChatMessage sanitizes via containsHtml.
	return [
		'<p>' + primary + '</p>',
		'<p><strong>' + tryTo + '</strong></p>',
		'<ul>',
		'<li>' +
			escapeHtml(resourceLineBefore) +
			'<a href="' +
			escapeHtmlAttr(resourceUrl) +
			'" target="_blank" rel="noopener noreferrer">' +
			escapeHtml(resourceCenterLabel) +
			'</a>' +
			escapeHtml(resourceLineAfter) +
			'</li>',
		'<li>' + escapeHtml(useDifferent + ' ' + clearShort) + '</li>',
		'<li>' +
			escapeHtml(reachOut + ' ' + callAt) +
			' <a href="tel:8884014678">888-401-4678</a> ' +
			escapeHtml(orLabel) +
			' ' +
			escapeHtml(chatLive) +
			' ' +
			escapeHtml(withSupport) +
			'</li>',
		'</ul>',
	].join('');
}

function escapeHtml(text) {
	if (typeof text !== 'string') return '';
	return text
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;');
}

function escapeHtmlAttr(text) {
	return escapeHtml(text);
}
