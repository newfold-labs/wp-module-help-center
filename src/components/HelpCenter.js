import { useEffect, useState, useMemo, useRef } from '@wordpress/element';
import { debounce } from 'lodash';
import moduleAI from '@newfold-labs/wp-module-ai';
import SearchResults from './SearchResults';
import { CapabilityAPI, LocalStorageUtils, Analytics } from '../utils';
import HelpCenterIntro from './HelpCenterIntro';
import SearchInput from './SearchInput';
import apiFetch from '@wordpress/api-fetch';

const HelpCenter = ( props ) => {
	const [ visible, setVisible ] = useState( false );
	const [ helpEnabled, setHelpEnabled ] = useState( false );
	const [ searchInput, setSearchInput ] = useState(
		LocalStorageUtils.getSearchInput()
	);
	const [ noResult, setNoResult ] = useState( false );
	const [ loadingQuery, setLoadingQuery ] = useState( null );
	const [ loadingIndex, setLoadingIndex ] = useState( null );
	const [ isNewResult, setIsNewResult ] = useState( false );
	const [ isLoading, setIsLoading ] = useState( false );
	const [ source, setSource ] = useState( 'kb' );
	const [ resultContent, setResultContent ] = useState( [] );
	const [ multiResults, setMultiResults ] = useState( {} );
	const [ showSuggestions, setShowSuggestions ] = useState( false );
	const [ initComplete, setInitComplete ] = useState( false );
	const suggestionsRef = useRef();
	const resultsContainer = useRef();
	const wrapper = useRef();
	const introRef = useRef();
	const brand = CapabilityAPI.getBrand();
	const getHelpStatus = async () => {
		try {
			const response = await CapabilityAPI.getHelpCenterCapability();
			setHelpEnabled( response );
		} catch ( exception ) {
			setHelpEnabled( false );
		}
	};
	useEffect( () => {
		getHelpStatus();
	}, [] );

	useEffect( () => {
		const updateVisibility = () => {
			setVisible( LocalStorageUtils.getHelpVisible() );
		};

		// Add the event listener on component mount
		window.addEventListener( 'storage', updateVisibility );

		// Remove the event listener when the component unmounts
		return () => {
			window.removeEventListener( 'storage', updateVisibility );
		};
	}, [] );

	useEffect( () => {
		if ( props.refresh && searchInput !== '' ) {
			setSearchInput( '' );
		}
	}, [ props.refresh ] );

	useEffect( () => {
		fetchInitialData();
	}, [] );

	useEffect( () => {
		if ( initComplete ) {
			adjustPadding();
			scroll();
		}
	}, [ initComplete ] );

	useEffect( () => {
		adjustPadding();
	}, [ showSuggestions ] );

	const populateSearchResult = ( postId ) => {
		const resultContentFormatted = resultContent.replace( /\n/g, '<br />' );
		// Retrieve existing results from local storage and using the updated persistResult method to store the result
		LocalStorageUtils.persistResult(
			resultContentFormatted,
			postId,
			searchInput
		);
		// Add new result to existing results and retrieve all results from local storage
		const updatedResults = LocalStorageUtils.getResultInfo();
		setResultContent( updatedResults );

		if ( postId ) {
			setIsNewResult( true );
			Analytics.sendEvent( 'help_search', {
				label_key: 'term',
				term: searchInput,
				page: window.location.href.toString(),
			} );
		}
	};

	const debouncedResults = useMemo( () => {
		return debounce( async ( query ) => {
			if ( ! query || query === '' ) {
				setMultiResults( {} );
				setShowSuggestions( false );
				return;
			}
			try {
				const multiSearchResults =
					await fetchMultiSearchResults( query );

				if ( multiSearchResults?.results?.[ 0 ]?.grouped_hits ) {
					setMultiResults( {
						hits: multiSearchResults?.results?.[ 0 ]?.grouped_hits,
					} );

					setShowSuggestions( true );
				}
			} catch ( error ) {
				// eslint-disable-next-line no-console
				console.error( 'Error fetching debounced results:', error );
			}
		}, 500 );
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [] );

	// Clear any debounce problems
	useEffect( () => {
		debouncedResults.cancel();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [] );

	const getAIResult = async () => {
		setIsLoading( true );
		setShowSuggestions( false );
		setLoadingQuery( searchInput );
		setLoadingIndex( resultContent.length );
		try {
			// Check existing multiResults
			let hits = multiResults?.hits?.[ 0 ]?.hits;
			const lastQuery = multiResults?.results?.[ 0 ]?.request_params?.q;

			if ( searchInput === lastQuery && checkAndPopulateResult( hits ) )
				return;

			// Make a new multi-search API call if no match is found
			const multiSearchResults =
				await fetchMultiSearchResults( searchInput );

			hits =
				multiSearchResults?.results?.[ 0 ]?.grouped_hits?.[ 0 ]?.hits;
			if ( checkAndPopulateResult( hits, searchInput ) ) return;

			setSource( 'ai' );
			const result = await moduleAI.search.getSearchResult(
				searchInput,
				'helpcenter'
			);
			if ( result.result[ 0 ] ) {
				populateSearchResult(
					result.result[ 0 ].text,
					result.post_id,
					searchInput
				);
			} else {
				setNoResult( true );
			}
		} catch ( exception ) {
			// eslint-disable-next-line no-console
			console.error( 'An error occurred:', exception );
			setNoResult( true );
			setIsNewResult( true ); // to display no result error only for the upcoming result.
			setSearchInput( searchInput );
		} finally {
			setSearchInput( '' );
			setLoadingQuery( null );
			setIsLoading( false );
			setLoadingIndex( null );
			setShowSuggestions( false );
			LocalStorageUtils.persistSearchInput( '' );
		}
	};

	const handleSuggestionsClick = ( result, postTitle ) => {
		setShowSuggestions( false );
		populateSearchResult(
			result?.hits[ 0 ]?.document?.post_content,
			result?.hits[ 0 ]?.document?.id,
			postTitle
		);
	};

	const fetchMultiSearchResults = async ( query ) => {
		try {
			const response = await apiFetch( {
				path: '/newfold-multi-search/v1/multi_search',
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify( { query, brand } ),
			} );

			return response;
		} catch ( error ) {
			// eslint-disable-next-line no-console
			console.error( 'Error fetching multi-search results:', error );
			return {};
		}
	};

	const fetchInitialData = async () => {
		try {
			// Populate the results from local storage if they exist
			const savedResults = LocalStorageUtils.getResultInfo();
			if ( savedResults ) {
				setResultContent( savedResults );
			}

			const multiSearchResults = await fetchMultiSearchResults(
				searchInput,
				brand
			);

			setMultiResults( {
				hits: multiSearchResults?.results?.[ 0 ]?.grouped_hits,
			} );

			setShowSuggestions( true );
			setInitComplete( true );
		} catch ( error ) {
			// eslint-disable-next-line no-console
			console.error( 'Error fetching initial data:', error );
		}
	};

	const adjustPadding = () => {
		let paddingBottom = 0;
		if ( showSuggestions ) {
			const suggestionsHeight =
				suggestionsRef.current.getBoundingClientRect().height;
			paddingBottom = `${ suggestionsHeight }px`;
		}
		if ( wrapper && wrapper.current ) {
			wrapper.current.style.paddingBottom = paddingBottom;
		}
	};

	const scroll = () => {
		const scrollDistance = wrapper.current.scrollHeight;
		wrapper.current.scrollBy( {
			top: scrollDistance,
			left: 0,
			behavior: 'auto',
		} );

		setTimeout( () => {
			introRef.current.style.visibility = 'visible';
			resultsContainer.current.style.visibility = 'visible';
		}, 100 );
	};

	const getResultMatches = ( query, tokensMatched, fieldsMatched ) => {
		const clearedQuery = query
			.replace( /[^\w\s]|_/g, '' )
			.replace( /\s{2,}/g, ' ' )
			.trim();

		const tokensPerQuery =
			tokensMatched / clearedQuery.split( /\s+/ ).length;
		return fieldsMatched >= 1 && tokensPerQuery >= 0.99;
	};

	const checkAndPopulateResult = ( hits ) => {
		if ( hits?.length > 0 ) {
			const resultMatches = getResultMatches(
				searchInput,
				hits[ 0 ]?.text_match_info?.tokens_matched,
				hits[ 0 ]?.text_match_info?.fields_matched
			);

			if ( resultMatches ) {
				populateSearchResult(
					hits[ 0 ].document.post_content,
					hits[ 0 ].document.post_id || hits[ 0 ].document.id,
					searchInput
				);
				return true;
			}
		}
		return false;
	};

	if ( ! helpEnabled || ! visible ) {
		return <></>;
	}

	return (
		<div
			className="nfd-help-center"
			id="helpcenterResultsWrapper"
			ref={ wrapper }
		>
			<HelpCenterIntro introRef={ introRef } />
			<SearchResults
				wrapper={ wrapper }
				introRef={ introRef }
				noResult={ noResult }
				loadingQuery={ loadingQuery }
				loadingIndex={ loadingIndex }
				isNewResult={ isNewResult }
				isLoading={ isLoading }
				source={ source }
				resultContent={ resultContent }
				resultsContainer={ resultsContainer }
				searchInput={ searchInput }
				showSuggestions={ showSuggestions }
				suggestionsRef={ suggestionsRef }
				multiResults={ multiResults }
				handleSuggestionsClick={ handleSuggestionsClick }
				{ ...props }
			/>
			<SearchInput
				searchInput={ searchInput }
				setSearchInput={ setSearchInput }
				populateSearchResult={ populateSearchResult }
				debouncedResults={ debouncedResults }
				setNoResult={ setNoResult }
				getAIResult={ getAIResult }
			/>
		</div>
	);
};

export default HelpCenter;
