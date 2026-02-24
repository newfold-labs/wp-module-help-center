/* eslint-disable no-undef */
import { HiiveAnalytics, HiiveEvent } from '@newfold/js-utility-ui-analytics';
import { NewfoldRuntime } from '@newfold/wp-module-runtime';
import apiFetch from '@wordpress/api-fetch';
import { useEffect, useState } from '@wordpress/element';

const base = 'nfd-help-center/v1';
const onboardingBase = 'newfold-onboarding/v1';

export const InteractionAPIs = {
	postFeedback: (postId, status) =>
		apiFetch({
			path: base + '/feedback',
			method: 'POST',
			data: {
				post_id: postId,
				status,
			},
		}),
};

export const OnboardingAPIs = {
	getFlowData: () =>
		apiFetch({
			path: onboardingBase + '/flow',
			method: 'GET',
		}),
};

export const MultiSearchAPI = {
	fetchMultiSearchResults: async (query, brand) => {
		try {
			const response = await apiFetch({
				path: '/newfold-multi-search/v1/multi_search',
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ query, brand }),
			});

			return response;
		} catch (error) {
			// eslint-disable-next-line no-console
			console.error('Error in getMultiSearchResults:', error);
			return {};
		}
	},

	fetchTooltipSearchResults: async (postId) => {
		try {
			const response = await apiFetch({
				path: '/newfold-multi-search/v1/tooltip_search',
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ postId }),
			});

			return response;
		} catch (error) {
			// eslint-disable-next-line no-console
			console.error('Error in getMultiSearchResults:', error);
			return {};
		}
	},
};

export const CapabilityAPI = {
	getHelpCenterCapability: () => {
		return (
			// get the help center capability from newfold runtime
			window.NewfoldRuntime?.capabilities?.canAccessHelpCenter || false
		);
	},
	getBrand: () => {
		// get the brand name from newfold runtime
		const brand = window.NewfoldRuntime?.plugin?.brand || 'wordpress';
		// add region if HostGator
		if (
			brand.includes('hostgator') &&
			window.NewfoldRuntime?.plugin?.region
		) {
			return brand + '-' + window.NewfoldRuntime?.plugin?.region;
		}
		return brand;
	},
};

/**
 * Cached runtime promise - ensures only one polling instance exists
 * @type {Promise<object>|null}
 */
let runtimePromise = null;

/**
 * Wait for the NewfoldRuntime object (with plugin.brand) to be available on window.
 * Uses a cached promise to prevent duplicate polling and errors.
 * Follows the same pattern as waitForRuntime in host plugin helpers.
 *
 * @param {number} timeout - Maximum time to wait in milliseconds (default: 5000)
 * @return {Promise<object>} Resolves with the runtime object when available
 */
export const waitForRuntime = ( timeout = 5000 ) => {
	if ( runtimePromise ) {
		return runtimePromise;
	}

	runtimePromise = new Promise( ( resolve, reject ) => {
		if ( window.NewfoldRuntime?.plugin?.brand ) {
			resolve( window.NewfoldRuntime );
			return;
		}

		const startTime = Date.now();
		const interval = setInterval( () => {
			if ( window.NewfoldRuntime?.plugin?.brand ) {
				clearInterval( interval );
				resolve( window.NewfoldRuntime );
			} else if ( Date.now() - startTime >= timeout ) {
				clearInterval( interval );
				runtimePromise = null;
				reject(
					new Error(
						'NewfoldRuntime not available, please refresh the page and try again.'
					)
				);
			}
		}, 50 );
	} );

	return runtimePromise;
};

// A wrapper to get and set things more easily
export const LocalStorageUtils = {
	updateHelpVisible: (visible) => {
		localStorage.setItem('helpVisible', visible ? 'true' : 'false');
	},
	getHelpVisible: () => {
		return localStorage.getItem('helpVisible') === 'true';
	},
	persistResult: (
		resultContent,
		postId,
		searchInput,
		feedbackSubmitted = null,
		hasLaunchedFromTooltip
	) => {
		// Only store the result if resultContent has a value
		if (!resultContent || resultContent.trim() === '') {
			return;
		}

		/* 		// Retrieve existing results or initialize as an empty array
		const existingResults = LocalStorageUtils.getResultInfo();
 */
		// Create a new result object
		const newResult = {
			searchInput,
			resultContent,
			postId,
			feedbackSubmitted,
			hasLaunchedFromTooltip,
		};

		// Add new result to the array
		/* existingResults.push(newResult); */

		// Store the updated array back in local storage
		localStorage.setItem('helpResultContent', JSON.stringify(newResult));
	},

	persistSearchInput: (searchInput) => {
		localStorage.setItem('searchInput', searchInput);
	},
	clear: () => {
		localStorage.removeItem('helpResultContent');
		localStorage.removeItem('helpPostId');
		localStorage.removeItem('searchInput');
	},
	// Update getResultInfo to retrieve all results
	getResultInfo: () => {
		const results = localStorage.getItem('helpResultContent');
		return results && isValidJSON(results) ? JSON.parse(results) : [];
	},
	getSearchInput: () => {
		return localStorage.getItem('searchInput');
	},
	getFeatureFlag(flagName) {
		return localStorage.getItem(flagName);
	},
	clearSearchInput() {
		localStorage.removeItem('searchInput');
	},
	setFeatureFlag(flagName, value) {
		localStorage.setItem(flagName, value);
	},
	updateFeedbackStatus: () => {
		const savedResults = LocalStorageUtils.getResultInfo();
		savedResults.feedbackSubmitted = true;
		localStorage.setItem('helpResultContent', JSON.stringify(savedResults));
	},
};

export const Analytics = {
	sendEvent: (action, data) => {
		const hiiveEvent = new HiiveEvent(
			'wonder_help',
			action,
			data,
			'wonder_help'
		);
		HiiveAnalytics.send(hiiveEvent);
	},
};

export const useRevealText = (text, speed = 100, startReveal = false) => {
	const [displayedText, setDisplayedText] = useState('');
	const [isComplete, setIsComplete] = useState(false);

	useEffect(() => {
		if (!text) {
			setDisplayedText('');
			setIsComplete(false);
			return;
		}

		// Only trigger the reveal effect if startReveal is true
		if (startReveal) {
			// Split text and filter out empty strings
			const words = text.trim().split(' ').filter(Boolean);
			let index = 0;

			// Initialize with the first word
			setDisplayedText(words[0]);
			setIsComplete(false);

			const intervalId = setInterval(() => {
				if (index < words.length - 1) {
					index++;
					setDisplayedText((prev) => prev + ' ' + words[index]);
				} else {
					clearInterval(intervalId);
					setIsComplete(true);
				}
			}, speed);

			return () => clearInterval(intervalId);
		}

		setDisplayedText(text);
		setIsComplete(true);
	}, [text, speed, startReveal]);

	return { displayedText, isComplete };
};

export const isValidJSON = (json) => {
	try {
		JSON.parse(json);
		return true;
	} catch (e) {
		return false;
	}
};

/* Replace multiple line breaks with one line, remove line breaks at the start and end, convert existing \n to <br> */
export function formatPostContent(postContent = '') {
	return postContent
		.replace(/\n{2,}/g, '\n')
		.replace(/^\n+|\n+$/g, '')
		.replace(/\n/g, '<br />')
		.replace(/(<ul[^>]*>)[\s\n\r]*<br\s*\/?>/g, '$1')
		.replace(/<br\s*\/?>\s*(?=<li)/g, '')
		.replace(/<br\s*\/?>\s*(<\/ul>)/g, '$1');
}

export function getResultMatches(query, tokensMatched, fieldsMatched) {
	const clearedQuery = query
		.replace(/[^\w\s]|_/g, '')
		.replace(/\s{2,}/g, ' ')
		.trim();

	const tokensPerQuery = tokensMatched / clearedQuery.split(/\s+/).length;
	return fieldsMatched >= 1 && tokensPerQuery >= 0.99;
}

export function scrollToBottom(wrapperRef, resultsContainerRef) {
	if (!wrapperRef?.current) {
		return;
	}
	const scrollDistance = wrapperRef.current.scrollHeight;

	wrapperRef.current.scrollBy({
		top: scrollDistance,
		left: 0,
		behavior: 'auto',
	});

	if (resultsContainerRef?.current) {
		resultsContainerRef.current.style.visibility = 'visible';
	}
}

export function adjustPadding(wrapperRef) {
	let availableHeight;
	const header = document.querySelector('.nfd-hc-modal__header');
	const inputWrapper = document.querySelector('#nfdHelpcenterInputWrapper');

	if (header && inputWrapper) {
		const totalUsedHeight =
			header.offsetHeight + inputWrapper.offsetHeight + 32;

		availableHeight = window.innerHeight - totalUsedHeight;
	}

	if (wrapperRef?.current) {
		wrapperRef.current.style.height = `${availableHeight}px`;
	}
}

/* Process inline markdown syntax inside the <p> tags */
export const processContentForMarkdown = (textToDisplay) => {
	if (!textToDisplay) {
		return '';
	}

	const parser = new DOMParser();
	const doc = parser.parseFromString(textToDisplay, 'text/html');

	// Only process text inside <p> tags
	const paragraphElements = doc.querySelectorAll('p');

	paragraphElements.forEach((p) => {
		let innerHTML = p.innerHTML;

		// replace inline Markdown syntax with html tags
		innerHTML = innerHTML
			.replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>')
			.replace(/___(.+?)___/g, '<strong><em>$1</em></strong>')
			.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
			.replace(/__(.+?)__/g, '<strong>$1</strong>')
			.replace(/\*([^\s*](?:[^*]*[^\s*])?)\*/g, '<em>$1</em>')
			.replace(/_([^\s_](?:[^_]*[^\s_])?)_/g, '<em>$1</em>')
			.replace(/~~(.+?)~~/g, '<del>$1</del>')
			.replace(/`([^`]+)`/g, '<code>$1</code>')
			.replace(
				/\[([^\]]+)\]\(([^)]+?)(?:\s+"([^"]*)")?\)/g,
				(match, text, url, title) => {
					return title
						? `<a href="${url}" title="${title}">${text}</a>`
						: `<a href="${url}">${text}</a>`;
				}
			)
			.replace(
				/!\[([^\]]*)\]\(([^)]+?)(?:\s+"([^"]*)")?\)/g,
				(match, alt, src, title) => {
					return title
						? `<img src="${src}" alt="${alt}" title="${title}" />`
						: `<img src="${src}" alt="${alt}" />`;
				}
			);

		p.innerHTML = innerHTML;
	});

	return doc.body.innerHTML;
};

export const saveHelpcenterOption = async (result) => {
	const apiUrl = NewfoldRuntime.createApiUrl('/wp/v2/settings');
	try {
		await apiFetch({
			url: apiUrl,
			method: 'POST',
			data: { nfd_helpcenter_data: JSON.stringify(result) },
		});
	} catch (err) {
		// console.log(err);
	}
};

export const getHelpcenterOption = async () => {
	const apiUrl = NewfoldRuntime.createApiUrl('/wp/v2/settings');
	try {
		const response = await apiFetch({ url: apiUrl, method: 'GET' });
		const responseData =
			response.nfd_helpcenter_data &&
			JSON.parse(response.nfd_helpcenter_data);

		if (responseData?.length > 0) {
			return responseData;
		}
	} catch (err) { }
};

export const getMultiSearchResponse = async (query, brand) => {
	try {
		const multiSearchResults = await MultiSearchAPI.fetchMultiSearchResults(
			query,
			brand
		);
		const hits =
			multiSearchResults?.results?.[0]?.grouped_hits?.[0]?.hits || [];

		return {
			hits,
			fullResponse: multiSearchResults,
			lastQuery: multiSearchResults?.results?.[0]?.request_params?.q,
		};
	} catch (error) {
		// eslint-disable-next-line no-console
		console.error('Multi-search failed:', error);
		throw error;
	}
};
