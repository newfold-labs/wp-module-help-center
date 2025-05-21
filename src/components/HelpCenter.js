import { useEffect, useRef } from '@wordpress/element';
import { useDispatch, useSelector } from 'react-redux';
import { helpcenterActions } from '../../store/helpcenterSlice';
import {
	CapabilityAPI,
	LocalStorageUtils,
	MultiSearchAPI,
	adjustPadding,
	scrollToBottom,
} from '../utils';
import DislikeFeedbackPanel from './DislikeFeedbackPanel';
import HelpCenterIntro from './HelpCenterIntro';
import ResultList from './ResultList';
import NoResults from './ResultList/NoResults';
import SearchInput from './SearchInput';

// import { SuggestionList } from './SuggestionList';

const HelpCenter = () => {
	const dispatch = useDispatch();
	const initialState = useSelector( ( state ) => state.helpcenter );
	const brand = CapabilityAPI.getBrand();

	const suggestionsRef = useRef();
	const resultsContainer = useRef();
	const wrapper = useRef();

	useEffect( () => {
		getHelpStatus();

		// Add event listener for localStorage changes
		const updateVisibility = () => {
			dispatch(
				helpcenterActions.updateVisibility(
					LocalStorageUtils.getHelpVisible()
				)
			);
		};
		window.addEventListener( 'storage', updateVisibility );

		// Remove the event listener when the component unmounts
		return () => {
			// Cancel any debounced calls
			// debouncedResults.cancel();---------
			// Remove the storage event listener
			window.removeEventListener( 'storage', updateVisibility );
		};
	}, [] );

	useEffect( () => {
		checkFooterVisibility();
		if ( initialState.initComplete ) {
			adjustPadding(
				wrapper,
				suggestionsRef,
				initialState.showSuggestions
			);
			scrollToBottom( wrapper, resultsContainer );
		}
		// If the wrapper is visible or we’ve just finished init, scroll
	}, [ initialState.initComplete, initialState.disliked ] );

	useEffect( () => {
		if ( initialState.visible ) {
			fetchInitialData();
			checkFooterVisibility();
			adjustPadding(
				wrapper,
				suggestionsRef,
				initialState.showSuggestions
			);
			setTimeout( () => {
				scrollToBottom( wrapper, resultsContainer );
			}, 500 );
		}
	}, [ initialState.visible ] );

	useEffect( () => {
		// Always adjust padding if any of these dependencies change
		adjustPadding( wrapper, suggestionsRef, initialState.showSuggestions );
	}, [ initialState.showSuggestions ] );

	const checkFooterVisibility = () =>
		dispatch(
			helpcenterActions.setIsFooterVisible(
				initialState.helpResultHistory.length < 1 ||
					initialState.disliked
			)
		);

	const getHelpStatus = async () => {
		try {
			const response = await CapabilityAPI.getHelpCenterCapability();
			dispatch( helpcenterActions.updateHelpEnabled( response ) );
		} catch ( exception ) {
			dispatch( helpcenterActions.updateHelpEnabled( false ) );
		}
	};

	// const handleSuggestionsClick = ( result, postTitle ) => {
	// 	setState( ( prev ) => ( {
	// 		...prev,
	// 		showSuggestions: false,
	// 		disliked: false,
	// 	} ) );
	// 	populateSearchResult(
	// 		result?.hits[ 0 ]?.document?.post_content,
	// 		result?.hits[ 0 ]?.document?.id,
	// 		postTitle
	// 	);
	// 	props.setIsFooterVisible( false );
	// };

	const fetchInitialData = async () => {
		try {
			// Populate the results from local storage if they exist
			const resultContent = initialState.helpResultHistory;
			if ( resultContent ) {
				dispatch(
					helpcenterActions.updateResultContent( resultContent )
				);
			}

			if ( ! initialState.searchInput ) {
				// If no input, just mark init as complete
				dispatch( helpcenterActions.updateInitComplete( true ) );
				return;
			}

			const multiSearchResults =
				await MultiSearchAPI.fetchMultiSearchResults(
					initialState.searchInput,
					brand
				);
			dispatch(
				helpcenterActions.updateMultiResults( {
					results: {
						hits: multiSearchResults?.results?.[ 0 ]?.grouped_hits,
					},
					suggestions: true,
				} )
			);
			dispatch( helpcenterActions.updateInitComplete( true ) );
		} catch ( error ) {
			// eslint-disable-next-line no-console
			console.error( 'Error fetching initial data:', error );
		}
	};

	if ( ! initialState.helpEnabled || ! initialState.visible ) {
		return null;
	}

	return (
		<div
			className="nfd-help-center"
			id="helpcenterResultsWrapper"
			ref={ wrapper }
		>
			{ initialState.noResult ? (
				<NoResults />
			) : (
				<>
					{ initialState.disliked ? (
						<DislikeFeedbackPanel />
					) : (
						<>
							<HelpCenterIntro />
							<ResultList
								wrapper={ wrapper }
								resultsContainer={ resultsContainer }
							/>
						</>
					) }
				</>
			) }
			{ /* { initialState.showSuggestions && (
				{/* { initialState.showSuggestions && (
					<SuggestionList
					suggestionsRef={ suggestionsRef }
					multiResults={ initialState.multiResults }
					handleSuggestionsClick={ handleSuggestionsClick }
					isFooterVisible={ props.isFooterVisible }
				/>
			) } */ }
			<SearchInput />
		</div>
	);
};

export default HelpCenter;
