/* eslint-disable no-shadow */
import { debounce } from 'lodash';
import { useEffect, useState, useMemo } from '@wordpress/element';
import moduleAI from '@newfold-labs/wp-module-ai';
import { SearchResultSuggestions } from './SearchResultSuggestions';
import { ResultContent } from './ResultContent';
import { Analytics, LocalStorageUtils, CapabilityAPI } from '../utils';
import { __ } from '@wordpress/i18n';
import apiFetch from '@wordpress/api-fetch';
import SearchInput from './SearchInput';

const SearchResults = ( props ) => {
	const [ isLoading, setIsLoading ] = useState( false );
	const [ noResult, setNoResult ] = useState( false );
	const [ searchInput, setSearchInput ] = useState( '' );
	const [ resultContent, setResultContent ] = useState( [] );
	const [ postId, setPostId ] = useState();
	const [ source, setSource ] = useState( 'kb' );
	const [ multiResults, setMultiResults ] = useState( {} );
	const [ showSuggestions, setShowSuggestions ] = useState( false );
	const [ loadingQuery, setLoadingQuery ] = useState( null );
	const [ loadingIndex, setLoadingIndex ] = useState( null );
	const [ isNewResult, setIsNewResult ] = useState( false );

	const populateSearchResult = ( resultContent, postId, searchInput ) => {
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

		setPostId( postId );
		LocalStorageUtils.persistSearchInput( searchInput );

		if ( postId ) {
			setIsNewResult( true );
		}

		if ( postId ) {
			Analytics.sendEvent( 'help_search', {
				label_key: 'term',
				term: searchInput,
				page: window.location.href.toString(),
			} );
		}
	};

	const fetchMultiSearchResults = async ( query, brand ) => {
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
				setIsNewResult( false );
			}
			const savedInput = LocalStorageUtils.getSearchInput();
			const input = savedInput || '';
			setSearchInput( input );
			const brand = await CapabilityAPI.getBrand();
			const multiSearchResults = await fetchMultiSearchResults(
				input,
				brand
			);
			setShowSuggestions( true );
			setMultiResults( {
				hits: multiSearchResults?.results?.[ 0 ]?.grouped_hits,
			} );
		} catch ( error ) {
			// eslint-disable-next-line no-console
			console.error( 'Error fetching initial data:', error );
		}
	};

	useEffect( () => {
		setSearchInput( '' );
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [ props.refresh ] );

	useEffect( () => {
		/* Recalculating the padding of the search results container to allow it scroll when suggestions pop up */
		const adjustPadding = () => {
			const helpcenterResultsWrapper = document.getElementById(
				'helpcenterResultsWrapper'
			);
			const suggestionsWrapper =
				document.getElementById( 'suggestionsWrapper' );

			if ( helpcenterResultsWrapper ) {
				if ( showSuggestions ) {
					const suggestionsHeight =
						suggestionsWrapper.getBoundingClientRect().height;
					helpcenterResultsWrapper.style.paddingBottom = `${ suggestionsHeight }px`;
				} else {
					helpcenterResultsWrapper.style.paddingBottom = '0px';
				}
			}
		};

		adjustPadding();
	}, [ showSuggestions ] );

	useEffect( () => {
		const fetchDataAndScroll = async () => {
			await fetchInitialData();
			const helpcenterResultsWrapper = document.getElementById(
				'helpcenterResultsWrapper'
			);
			if ( helpcenterResultsWrapper ) {
				const scrollDistance = helpcenterResultsWrapper.scrollHeight;
				helpcenterResultsWrapper.scrollBy( {
					top: scrollDistance,
					left: 0,
					behavior: 'smooth',
				} );
			}
		};

		fetchDataAndScroll();
	}, [] );

	const getResultMatches = ( query, tokensMatched, fieldsMatched ) => {
		const tokensPerQuery = tokensMatched / query.split( /\s+/ ).length;
		return fieldsMatched >= 1 && tokensPerQuery >= 0.99;
	};

	const checkAndPopulateResult = ( hits, searchInput ) => {
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

	const getAIResult = async () => {
		setIsLoading( true );
		setShowSuggestions( false );
		setLoadingQuery( searchInput );
		setLoadingIndex( resultContent.length );
		try {
			// Check existing multiResults
			let hits = multiResults?.hits?.[ 0 ]?.hits;
			if ( checkAndPopulateResult( hits, searchInput ) ) return;

			// Make a new multi-search API call if no match is found
			const brand = await CapabilityAPI.getBrand();
			const multiSearchResults = await fetchMultiSearchResults(
				searchInput,
				brand
			);
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
		} finally {
			setLoadingQuery( null );
			setIsLoading( false );
			setLoadingIndex( null );
			setShowSuggestions( false );
		}
	};

	const debouncedResults = useMemo( () => {
		return debounce( async ( query ) => {
			if ( ! query || query.length === 0 ) {
				setMultiResults( {} );
				setShowSuggestions( false );
				return;
			}
			try {
				const brand = await CapabilityAPI.getBrand();
				const multiSearchResults = await fetchMultiSearchResults(
					query,
					brand
				);
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

	const handleSuggestionsClick = ( result, postTitle ) => {
		setSearchInput( postTitle );
		setShowSuggestions( false );
		populateSearchResult(
			result?.hits[ 0 ]?.document?.post_content,
			result?.hits[ 0 ]?.document?.id,
			postTitle
		);
	};

	return (
		<>
			<div className="hc-results-container">
				{ /* Render existing results */ }
				{ resultContent?.length > 0 &&
					resultContent.map( ( result, index ) => (
						<ResultContent
							key={ index }
							content={ result.resultContent }
							noResult={ noResult }
							postId={ result.postId }
							source={ source }
							showFeedbackSection={
								! result.resultContent.includes(
									'do not possess the answer'
								)
							}
							questionBlock={ result.searchInput }
							isLoading={ isLoading }
							loadingQuery={ loadingQuery }
							loadingIndex={ loadingIndex }
							index={ index }
							isNewResult={ isNewResult }
							searchInput={ searchInput }
						/>
					) ) }

				{ /* Render a placeholder for the loading state if isLoading is true */ }
				{ isLoading && (
					<ResultContent
						key="loading"
						content={ null }
						noResult={ false }
						postId={ null }
						source="ai"
						showFeedbackSection={ false }
						questionBlock={ loadingQuery }
						isLoading={ isLoading }
						loadingQuery={ loadingQuery }
						loadingIndex={ loadingIndex }
						index={ resultContent.length }
						isNewResult={ isNewResult }
						searchInput={ searchInput }
					/>
				) }
			</div>
			{ showSuggestions && (
				<div className="suggestions-wrapper" id="suggestionsWrapper">
					{ multiResults?.hits?.length > 0 && (
						<p>
							<b>
								{ __(
									'Common Topics',
									'wp-module-help-center'
								) }
							</b>
						</p>
					) }
					{ multiResults?.hits?.map( ( result, index ) => {
						const el = document.createElement( 'span' );
						el.setAttribute( 'display', 'none' );
						el.innerHTML = result?.group_key;
						const postTitle = el.textContent || el.innerText;

						return (
							<SearchResultSuggestions
								key={ index }
								searchTitle={ postTitle }
								onGo={ () => {
									handleSuggestionsClick( result, postTitle );
								} }
							/>
						);
					} ) }
				</div>
			) }
			<SearchInput
				searchInput={ searchInput }
				setSearchInput={ setSearchInput }
				populateSearchResult={ populateSearchResult }
				debouncedResults={ debouncedResults }
				setNoResult={ setNoResult }
				getAIResult={ getAIResult }
			/>
		</>
	);
};

export default SearchResults;
