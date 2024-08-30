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
	persistResult: ( resultContent, postId ) => {
		localStorage.setItem( 'helpResultContent', resultContent );
		localStorage.setItem( 'helpPostId', postId );
	},
	persistSearchInput: ( searchInput ) => {
		localStorage.setItem( 'searchInput', searchInput );
	},
	clear: () => {
		localStorage.removeItem( 'helpResultContent' );
		localStorage.removeItem( 'helpPostId' );
		localStorage.removeItem( 'searchInput' );
	},
	getResultInfo: () => {
		return {
			content: localStorage.getItem( 'helpResultContent' ),
			postId: localStorage.getItem( 'helpPostId' ),
		};
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

export const useRevealText = ( text, speed = 1 ) => {
	const [ displayedText, setDisplayedText ] = useState( '' );

	useEffect( () => {
		if ( ! text ) {
			setDisplayedText( '' );
			return;
		}

		let index = 0;
		setDisplayedText( '' );

		const intervalId = setInterval( () => {
			setDisplayedText( ( prev ) => prev + text.charAt( index ) );
			index++;
			if ( index >= text.length ) {
				clearInterval( intervalId );
			}
		}, speed );

		// Cleanup interval on component unmount or when text/speed changes
		return () => clearInterval( intervalId );
	}, [ text, speed ] );

	return displayedText;
};
