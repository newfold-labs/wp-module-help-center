import { useEffect, useRef } from '@wordpress/element';
import { useDispatch, useSelector } from 'react-redux';

import {
	CapabilityAPI,
	LocalStorageUtils,
	MultiSearchAPI,
	adjustPadding,
} from '../utils';

import { helpcenterActions } from '../../store/helpcenterSlice';

import DislikeFeedbackPanel from './DislikeFeedbackPanel';
import HelpCenterIntro from './HelpCenterIntro';
import ResultList from './ResultList';
import NoResults from './ResultList/NoResults';
import SearchInput from './SearchInput';

const HelpCenter = () => {
	const dispatch = useDispatch();
	const {
		visible,
		helpEnabled,
		searchInput,
		disliked,
		noResult,
		initComplete,
		showSuggestions,
		resultContent,
		helpResultHistory,
	} = useSelector( ( state ) => state.helpcenter );

	const wrapper = useRef();
	const suggestionsRef = useRef();
	const resultsContainer = useRef();

	// === useEffect: on mount ===
	useEffect( () => {
		getHelpStatus();
		const updateVisibility = () =>
			dispatch(
				helpcenterActions.updateVisibility(
					LocalStorageUtils.getHelpVisible()
				)
			);
		window.addEventListener( 'storage', updateVisibility );

		return () => {
			window.removeEventListener( 'storage', updateVisibility );
		};
	}, [] );

	// === useEffect: on visible ===
	useEffect( () => {
		if ( visible ) {
			fetchInitialData();
			checkFooterVisibility();
			adjustPadding( wrapper, suggestionsRef, showSuggestions );
		}
	}, [ visible ] );

	// === useEffect: on initComplete / disliked ===
	useEffect( () => {
		if ( initComplete ) {
			checkFooterVisibility();
			adjustPadding( wrapper, suggestionsRef, showSuggestions );
		}
	}, [ initComplete, disliked ] );

	const getHelpStatus = async () => {
		try {
			const response = await CapabilityAPI.getHelpCenterCapability();
			dispatch( helpcenterActions.updateHelpEnabled( response ) );
		} catch {
			dispatch( helpcenterActions.updateHelpEnabled( false ) );
		}
	};

	const fetchInitialData = async () => {
		if ( ! searchInput ) {
			dispatch( helpcenterActions.updateInitComplete( true ) );
			return;
		}

		try {
			const results = await MultiSearchAPI.fetchMultiSearchResults(
				searchInput,
				CapabilityAPI.getBrand()
			);

			dispatch(
				helpcenterActions.updateMultiResults( {
					results: {
						hits: results?.results?.[ 0 ]?.grouped_hits || [],
					},
					suggestions: true,
				} )
			);

			dispatch( helpcenterActions.updateInitComplete( true ) );
		} catch ( error ) {
			console.error( 'Error fetching initial data:', error );
		}
	};

	const checkFooterVisibility = () => {
		dispatch(
			helpcenterActions.setIsFooterVisible(
				resultContent.length < 1 || disliked
			)
		);
	};

	if ( ! helpEnabled || ! visible ) {
		return null;
	}

	const renderResultContainer = () => {
		if ( noResult ) {
			return <NoResults />;
		}
		if ( disliked ) {
			return <DislikeFeedbackPanel />;
		}
		return (
			<>
				{ resultContent.length < 1 && <HelpCenterIntro /> }
				<ResultList
					wrapper={ wrapper }
					resultsContainer={ resultsContainer }
				/>
			</>
		);
	};

	return (
		<div
			className="nfd-help-center"
			id="helpcenterResultsWrapper"
			ref={ wrapper }
		>
			{ renderResultContainer() }
			<SearchInput />
		</div>
	);
};

export default HelpCenter;
