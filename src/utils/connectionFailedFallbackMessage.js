/**
 * Builds the exact same error-state message as the old help center "no results" block (NoResults.js).
 * Used when the AI chat connection has failed and the user sends a message.
 * Returns HTML so links and list items render with proper formatting in the chat.
 *
 * @param {string} userMessage - The message the user just sent (used as the query in the copy).
 * @return {string} Full fallback message as HTML (paragraphs, list, links).
 */
import { __, sprintf } from '@wordpress/i18n';

/**
 * Allow only http/https URLs for safe use in href to prevent XSS (e.g. javascript:/data:).
 * Mirrors getSafeResourceLink in NoResults.js.
 *
 * @param {string} url - URL to validate (e.g. from nfdHelpCenter.resourceLink).
 * @return {string} The URL if safe, otherwise '#'.
 */
function getSafeResourceLink(url) {
	if (typeof url !== 'string') {
		return '#';
	}
	const trimmed = url.trim();
	return trimmed.startsWith('http://') || trimmed.startsWith('https://')
		? trimmed
		: '#';
}

export function getConnectionFailedFallbackMessage(userMessage) {
	const messageText =
		!userMessage || !String(userMessage).trim()
			? 'this'
			: `"${String(userMessage).trim()}"`;

	const resourceUrl = getSafeResourceLink(
		window?.nfdHelpCenter?.resourceLink || '#'
	);

	const primary = sprintf(
		/* translators: %s: the user's search query (or the word "this" if empty) */
		__(
			"Sorry, I don't have any information on %s yet.",
			'wp-module-help-center'
		),
		messageText
	);
	const tryHeader = __('Here are a few things to try:', 'wp-module-help-center');

	// Each bullet uses sprintf with a single %s for the link / phone number so the
	// surrounding sentence stays one translatable string and the link text reads
	// naturally inline. Keeps the copy tight, parallel, and grammatically clean.
	const resourceCenterLabel = __('Resource center', 'wp-module-help-center');
	const bullet1 = sprintf(
		/* translators: %s: link to the Resource center */
		__(
			'Search our %s for a related article or video.',
			'wp-module-help-center'
		),
		'<a href="' +
			escapeHtmlAttr(resourceUrl) +
			'" target="_blank" rel="noopener noreferrer">' +
			escapeHtml(resourceCenterLabel) +
			'</a>'
	);

	const bullet2 = __(
		'Rephrase your question — short, clear prompts work best.',
		'wp-module-help-center'
	);

	const phoneNumber = '888-401-4678';
	const bullet3 = sprintf(
		/* translators: %s: clickable phone number */
		__(
			'Talk to a person — call %s or chat live with one of our agents.',
			'wp-module-help-center'
		),
		'<a href="tel:8884014678">' + escapeHtml(phoneNumber) + '</a>'
	);

	// Build HTML for proper formatting (links, bullets). ChatMessage sanitizes the
	// resulting HTML via DOMPurify, so the inline anchor markup is safe to inject here.
	return [
		'<p>' + escapeHtml(primary) + '</p>',
		'<p><strong>' + escapeHtml(tryHeader) + '</strong></p>',
		'<ul>',
		'<li>' + bullet1 + '</li>',
		'<li>' + escapeHtml(bullet2) + '</li>',
		'<li>' + bullet3 + '</li>',
		'</ul>',
	].join('');
}

function escapeHtml(text) {
	if (typeof text !== 'string') {
		return '';
	}
	return text
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;');
}

function escapeHtmlAttr(text) {
	return escapeHtml(text);
}
