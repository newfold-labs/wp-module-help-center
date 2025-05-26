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

// A wrapper to get and set things more easily
export const LocalStorageUtils = {
	updateHelpVisible: (visible) => {
		localStorage.setItem('helpVisible', visible ? 'true' : 'false');
	},
	getHelpVisible: () => {
		return localStorage.getItem('helpVisible') === 'true';
	},
	persistResult: (resultContent, postId, searchInput) => {
		// Only store the result if resultContent has a value
		if (!resultContent || resultContent.trim() === '') {
			return;
		}

		// Retrieve existing results or initialize as an empty array
		const existingResults = LocalStorageUtils.getResultInfo();

		// Create a new result object
		const newResult = {
			searchInput,
			resultContent,
			postId,
		};

		// Add new result to the array
		existingResults.push(newResult);

		// Store the updated array back in local storage
		localStorage.setItem(
			'helpResultContent',
			JSON.stringify(existingResults)
		);
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
	updateFeedbackStatus: (postId) => {
		const savedResults = LocalStorageUtils.getResultInfo();
		const updatedResults = savedResults.map((result) =>
			result.postId === postId
				? { ...result, feedbackSubmitted: true }
				: result
		);
		localStorage.setItem(
			'helpResultContent',
			JSON.stringify(updatedResults)
		);
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

export function formatPostContent(postContent = '') {
	return postContent.replace(/\n/g, '<br />');
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

export function adjustPadding(wrapperRef, suggestionsRef, showSuggestions) {
	let paddingBottom = 0;
	if (showSuggestions && suggestionsRef?.current) {
		const suggestionsHeight =
			suggestionsRef.current.getBoundingClientRect().height;
		paddingBottom = `${suggestionsHeight}px`;
	}

	if (wrapperRef?.current) {
		wrapperRef.current.style.paddingBottom = paddingBottom;
	}
}

/* Parse the html in string to a document node, replace the <p>  tags with a fragment and line break */
export const processContentForMarkdown = (textToDisplay) => {
	if (textToDisplay) {
		// eslint-disable-next-line no-undef
		const parser = new DOMParser();
		const doc = parser.parseFromString(textToDisplay, 'text/html');

		const paragraphElements = doc.querySelectorAll('p');

		paragraphElements.forEach((p) => {
			// Create a DocumentFragment to hold the content and <br> tags
			const fragment = document.createDocumentFragment();

			// Append all child nodes of the <p> to the fragment
			while (p.firstChild) {
				fragment.appendChild(p.firstChild);
			}

			const br1 = document.createElement('br');
			const br2 = document.createElement('br');
			fragment.appendChild(br1);
			fragment.appendChild(br2);

			// Replace the <p> element with the fragment
			p.parentNode.replaceChild(fragment, p);
		});

		const updatedContent = doc.body.innerHTML;
		return updatedContent;
	}
	return '';
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
		console.error('Multi-search failed:', error);
		throw error;
	}
};
