/* eslint-disable no-undef */
import {
	HiiveAnalytics,
	HiiveEvent,
} from '@newfold-labs/js-utility-ui-analytics';
import apiFetch from '@wordpress/api-fetch';
import { useEffect, useState } from '@wordpress/element';

const base = 'nfd-help-center/v1';
const onboardingBase = 'newfold-onboarding/v1';

export const InteractionAPIs = {
	postFeedback: ( postId, status ) =>
		apiFetch( {
			path: base + '/feedback',
			method: 'POST',
			data: {
				post_id: postId,
				status,
			},
		} ),
};

export const OnboardingAPIs = {
	getFlowData: () =>
		apiFetch( {
			path: onboardingBase + '/flow',
			method: 'GET',
		} ),
};

export const CapabilityAPI = {
	getHelpCenterCapability: () =>
		apiFetch( {
			path: base + '/capability',
			method: 'GET',
		} ),
	getBrand: () =>
		apiFetch( {
			path: base + '/capability/brand',
			method: 'GET',
		} ),
};

// A wrapper to get and set things more easily
export const LocalStorageUtils = {
	updateHelpVisible: ( visible ) => {
		localStorage.setItem( 'helpVisible', visible ? 'true' : 'false' );
	},
	getHelpVisible: () => {
		return localStorage.getItem( 'helpVisible' ) === 'true';
	},
	persistResult: ( resultContent, postId, searchInput ) => {
		// Only store the result if resultContent has a value
		if ( ! resultContent || resultContent.trim() === '' ) {
			return;
		}

		// Retrieve existing results or initialize as an empty array
		const existingResults =
			JSON.parse( localStorage.getItem( 'helpResultContent' ) ) || [];

		// Create a new result object
		const newResult = {
			searchInput,
			resultContent,
			postId,
		};

		// Add new result to the array
		existingResults.push( newResult );

		// Store the updated array back in local storage
		localStorage.setItem(
			'helpResultContent',
			JSON.stringify( existingResults )
		);
	},

	persistSearchInput: ( searchInput ) => {
		localStorage.setItem( 'searchInput', searchInput );
	},
	clear: () => {
		localStorage.removeItem( 'helpResultContent' );
		localStorage.removeItem( 'helpPostId' );
		localStorage.removeItem( 'searchInput' );
	},
	// Update getResultInfo to retrieve all results
	getResultInfo: () => {
		const results = localStorage.getItem( 'helpResultContent' );
		return results ? JSON.parse( results ) : [];
	},
	getSearchInput: () => {
		return localStorage.getItem( 'searchInput' );
	},
	getFeatureFlag( flagName ) {
		return localStorage.getItem( flagName );
	},
	setFeatureFlag( flagName, value ) {
		localStorage.setItem( flagName, value );
	},
};

export const Analytics = {
	sendEvent: ( action, data ) => {
		const hiiveEvent = new HiiveEvent(
			'wonder_help',
			action,
			data,
			'wonder_help'
		);
		HiiveAnalytics.send( hiiveEvent );
	},
};

export const useRevealText = ( text, speed = 500 ) => {
	const [ displayedText, setDisplayedText ] = useState( '' );

	useEffect( () => {
		if ( ! text ) {
			setDisplayedText( '' );
			return;
		}

		const words = text.split( ' ' );
		let index = 0;
		setDisplayedText( '' );
		// Append words one by one
		const intervalId = setInterval( () => {
			setDisplayedText(
				( prev ) => prev + ( prev ? ' ' : '' ) + words[ index ]
			);
			index++;
			if ( index >= words.length ) {
				clearInterval( intervalId );
			}
		}, speed );

		return () => clearInterval( intervalId );
	}, [ text, speed ] );

	return displayedText;
};
