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
			brand.includes( 'hostgator' ) &&
			window.NewfoldRuntime?.plugin?.region
		) {
			return brand + '-' + window.NewfoldRuntime?.plugin?.region;
		}
		return brand;
	},
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

export const useRevealText = ( text, speed = 100, startReveal = false ) => {
	const [ displayedText, setDisplayedText ] = useState( '' );
	const [ isComplete, setIsComplete ] = useState( false );

	useEffect( () => {
		if ( ! text ) {
			setDisplayedText( '' );
			setIsComplete( false );
			return;
		}

		// Only trigger the reveal effect if startReveal is true
		if ( startReveal ) {
			// Split text and filter out empty strings
			const words = text.trim().split( ' ' ).filter( Boolean );
			let index = 0;

			// Initialize with the first word
			setDisplayedText( words[ 0 ] );
			setIsComplete( false );

			const intervalId = setInterval( () => {
				if ( index < words.length - 1 ) {
					index++;
					setDisplayedText( ( prev ) => prev + ' ' + words[ index ] );
				} else {
					clearInterval( intervalId );
					setIsComplete( true );
				}
			}, speed );

			return () => clearInterval( intervalId );
		}

		setDisplayedText( text );
		setIsComplete( true );
	}, [ text, speed, startReveal ] );

	return { displayedText, isComplete };
};
