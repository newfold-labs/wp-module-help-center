import { useEffect, useState, useMemo, useRef } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { debounce } from 'lodash';
import moduleAI from '@newfold-labs/wp-module-ai';
import ResultList from './ResultList';
import {
	CapabilityAPI,
	LocalStorageUtils,
	Analytics,
	MultiSearchAPI,
	formatPostContent,
	getResultMatches,
	scrollToBottom,
	adjustPadding,
} from '../utils';
import HelpCenterIntro from './HelpCenterIntro';
import SearchInput from './SearchInput';

import { SuggestionList } from './SuggestionList';

const HelpCenter = ( props ) => {
	const [ state, setState ] = useState( {
		visible: false,
		helpEnabled: false,
		noResult: false,
		isNewResult: false,
		source: 'kb',
		searchInput: LocalStorageUtils.getSearchInput() || '',
		isLoading: false,
		loadingQuery: null,
		loadingIndex: null,
		resultContent: [],
		multiResults: {},
		showSuggestions: false,
		initComplete: false,
		errorMsg: '',
	} );

	const suggestionsRef = useRef();
	const resultsContainer = useRef();
	const wrapper = useRef();
	const introRef = useRef();

	const brand = CapabilityAPI.getBrand();

	useEffect( () => {
		getHelpStatus();
		fetchInitialData();

		// Add event listener for localStorage changes
		const updateVisibility = () => {
			setState( ( prev ) => ( {
				...prev,
				visible: LocalStorageUtils.getHelpVisible(),
			} ) );
		};
		window.addEventListener( 'storage', updateVisibility );

		// Remove the event listener when the component unmounts
		return () => {
			// Cancel any debounced calls
			debouncedResults.cancel();
			// Remove the storage event listener
			window.removeEventListener( 'storage', updateVisibility );
		};
	}, [] );

	useEffect( () => {
		// If the wrapper is visible or we’ve just finished init, scroll
		if ( state.initComplete || state.visible ) {
			setTimeout( () => {
				scrollToBottom( wrapper, introRef, resultsContainer );
			}, 100 );
		}
	}, [ state.initComplete, state.visible ] );

	useEffect( () => {
		// Always adjust padding if any of these dependencies change
		adjustPadding( wrapper, suggestionsRef, state.showSuggestions );
	}, [ state.showSuggestions ] );

	const getHelpStatus = async () => {
		try {
			const response = await CapabilityAPI.getHelpCenterCapability();
			setState( ( prev ) => ( {
				...prev,
				helpEnabled: response,
			} ) );
		} catch ( exception ) {
			setState( ( prev ) => ( {
				...prev,
				helpEnabled: false,
			} ) );
		}
	};

	const populateSearchResult = ( postContent, postId, postTitle ) => {
		const resultContentFormatted = postContent
			? formatPostContent( postContent )
			: '';
		// Retrieve existing results from local storage and using the updated persistResult method to store the result
		LocalStorageUtils.persistResult(
			resultContentFormatted,
			postId,
			postTitle
		);

		// Add new result to existing results and retrieve all results from local storage
		setState( ( prev ) => ( {
			...prev,
			resultContent: LocalStorageUtils.getResultInfo(),
		} ) );

		if ( postId ) {
			setState( ( prev ) => ( {
				...prev,
				isNewResult: !! postId,
				searchInput: '',
			} ) );

			Analytics.sendEvent( 'help_search', {
				label_key: 'term',
				term: postTitle,
				page: window.location.href.toString(),
			} );
		}
	};

	const debouncedResults = useMemo( () => {
		return debounce( async ( query ) => {
			if ( ! query ) {
				setState( ( prev ) => ( {
					...prev,
					multiResults: {},
					showSuggestions: false,
				} ) );
				return;
			}

			try {
				const multiSearchResults =
					await MultiSearchAPI.fetchMultiSearchResults(
						query,
						brand
					);

				const results =
					multiSearchResults?.results?.[ 0 ]?.grouped_hits;
				if ( results ) {
					setState( ( prev ) => ( {
						...prev,
						multiResults: { hits: results },
						showSuggestions: !! results,
					} ) );
				}
			} catch ( error ) {
				// eslint-disable-next-line no-console
				console.error( 'Error fetching debounced results:', error );
			}
		}, 500 );
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [] );

	const getAIResult = async () => {
		setState( ( prev ) => ( {
			...prev,
			isLoading: true,
			showSuggestions: false,
			loadingQuery: prev.searchInput,
			loadingIndex: prev.resultContent.length,
		} ) );
		try {
			// Check existing multiResults
			let hits = state.multiResults?.hits?.[ 0 ]?.hits;
			const lastQuery =
				state.multiResults?.results?.[ 0 ]?.request_params?.q;

			if (
				state.searchInput === lastQuery &&
				checkAndPopulateResult( hits )
			)
				return;

			// Make a new multi-search API call if no match is found
			const multiSearchResults =
				await MultiSearchAPI.fetchMultiSearchResults(
					state.searchInput,
					brand
				);

			hits =
				multiSearchResults?.results?.[ 0 ]?.grouped_hits?.[ 0 ]?.hits;
			if ( checkAndPopulateResult( hits ) ) return;

			const result = await moduleAI.search.getSearchResult(
				state.searchInput,
				'helpcenter'
			);

			if ( result.result[ 0 ] ) {
				setState( ( prevState ) => ( { ...prevState, source: 'ai' } ) );
				populateSearchResult(
					result.result[ 0 ].text,
					result.post_id,
					state.searchInput
				);
			} else {
				setState( ( prev ) => ( { ...prev, noResult: true } ) );
			}
		} catch ( exception ) {
			// eslint-disable-next-line no-console
			console.error( 'An error occurred:', exception );
			setState( ( prev ) => ( {
				...prev,
				noResult: true,
				isNewResult: true,
			} ) );
		} finally {
			setState( ( prev ) => ( {
				...prev,
				searchInput: '',
				isLoading: false,
				loadingIndex: null,
				loadingQuery: null,
				showSuggestions: false,
			} ) );
			LocalStorageUtils.persistSearchInput( state.searchInput );
		}
	};

	const handleSuggestionsClick = ( result, postTitle ) => {
		setState( ( prev ) => ( {
			...prev,
			showSuggestions: false,
		} ) );
		populateSearchResult(
			result?.hits[ 0 ]?.document?.post_content,
			result?.hits[ 0 ]?.document?.id,
			postTitle
		);
	};

	const fetchInitialData = async () => {
		try {
			// Populate the results from local storage if they exist
			const resultContent = LocalStorageUtils.getResultInfo();
			if ( resultContent ) {
				setState( ( prev ) => ( { ...prev, resultContent } ) );
			}

			const multiSearchResults =
				await MultiSearchAPI.fetchMultiSearchResults(
					state.searchInput,
					brand
				);

			setState( ( prev ) => ( {
				...prev,
				showSuggestions: true,
				initComplete: true,
				multiResults: {
					hits: multiSearchResults?.results?.[ 0 ]?.grouped_hits,
				},
			} ) );
		} catch ( error ) {
			// eslint-disable-next-line no-console
			console.error( 'Error fetching initial data:', error );
		}
	};

	const checkAndPopulateResult = ( hits ) => {
		if ( hits?.length > 0 ) {
			const resultMatches = getResultMatches(
				state.searchInput,
				hits[ 0 ]?.text_match_info?.tokens_matched,
				hits[ 0 ]?.text_match_info?.fields_matched
			);
			if ( resultMatches ) {
				populateSearchResult(
					hits[ 0 ].document.post_content,
					hits[ 0 ].document.post_id || hits[ 0 ].document.id,
					state.searchInput
				);
				return true;
			}
		}
		return false;
	};

	const validateInput = () => {
		const isValid = state.searchInput.trim().length > 0;
		setState( ( prev ) => ( {
			...prev,
			errorMsg: isValid
				? ''
				: __(
						'Please enter a specific search term to get results.',
						'wp-module-help-center'
				  ),
		} ) );

		return isValid;
	};

	const handleOnChange = ( e ) => {
		populateSearchResult( '', undefined, e.target.value );
		debouncedResults( e.target.value );
		setState( ( prev ) => ( {
			...prev,
			noResult: false,
			errorMsg: '',
			searchInput: e.target.value,
		} ) );
	};

	const handleSubmit = async () => {
		if ( validateInput() ) {
			await getAIResult();
		}
	};

	if ( ! state.helpEnabled || ! state.visible ) return null;

	return (
		<div
			className="nfd-help-center"
			id="helpcenterResultsWrapper"
			ref={ wrapper }
		>
			<HelpCenterIntro introRef={ introRef } />
			<ResultList
				{ ...state }
				wrapper={ wrapper }
				introRef={ introRef }
				resultsContainer={ resultsContainer }
				suggestionsRef={ suggestionsRef }
				{ ...props }
			/>
			{ state.showSuggestions && (
				<SuggestionList
					suggestionsRef={ suggestionsRef }
					multiResults={ state.multiResults }
					handleSuggestionsClick={ handleSuggestionsClick }
				/>
			) }
			<SearchInput
				searchInput={ state.searchInput }
				handleOnChange={ handleOnChange }
				handleSubmit={ handleSubmit }
				errorMsg={ state.errorMsg }
			/>
		</div>
	);
};

export default HelpCenter;
