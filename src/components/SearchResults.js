/* eslint-disable no-shadow */
import { debounce } from 'lodash';
import { useEffect, useState, useMemo, useRef } from '@wordpress/element';
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
	// const [ loading, setLoading ] = useState( false );
	const [ showSuggestions, setShowSuggestions ] = useState( true );
	const [ loadingQuery, setLoadingQuery ] = useState( null );
	const [ loadingIndex, setLoadingIndex ] = useState( null );

	const containerRef = useRef( null );

	const populateSearchResult = ( resultContent, postId, searchInput ) => {
		const resultContentFormatted = resultContent.replace( /\n/g, '<br />' );
		// Retrieve existing results from local storage
		// Use the updated persistResult method to store the result
		LocalStorageUtils.persistResult(
			resultContentFormatted,
			postId,
			searchInput
		);
		// Add new result to existing results
		// Retrieve all results from local storage
		const updatedResults = LocalStorageUtils.getResultInfo();

		// Update state with new results
		setResultContent( updatedResults );

		setPostId( postId );
		LocalStorageUtils.persistSearchInput( searchInput );
		const helpCenterElement = document.getElementById( 'nfd-help-center' );
		if ( helpCenterElement ) {
			helpCenterElement.scrollTo( {
				top: helpCenterElement.scrollHeight,
				behavior: 'smooth', // This enables smooth scrolling
			} );
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
			const savedInput = LocalStorageUtils.getSearchInput();
			const input = savedInput || ' ';
			setSearchInput( input );
			const brand = await CapabilityAPI.getBrand();
			const multiSearchResults = await fetchMultiSearchResults(
				input,
				brand
			);
			setMultiResults( {
				...multiSearchResults,
				hits: multiSearchResults?.results?.[ 0 ]?.grouped_hits,
			} );
		} catch ( error ) {
			console.error( 'Error fetching initial data:', error );
		}
	};

	useEffect( () => {
		setSearchInput( '' );
		setResultContent( [] );
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [ props.refresh ] );

	useEffect( () => {
		fetchInitialData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [] );

	const getResultMatches = ( query, tokensMatched, fieldsMatched ) => {
		const tokensPerQuery = tokensMatched / query.split( /\s+/ ).length;
		return fieldsMatched >= 1 && tokensPerQuery >= 0.99;
	};

	const getAIResult = async () => {
		setIsLoading( true );
		setShowSuggestions( false );
		setLoadingQuery( searchInput );
		setLoadingIndex( resultContent.length );
		try {
			// Check if the algolia results are close enough
			const hits = multiResults.hits;
			const resultMatches =
				hits.length > 0
					? getResultMatches(
							searchInput,
							hits[ 0 ].text_match_info?.tokens_matched,
							hits[ 0 ].text_match_info?.fields_matched
					  )
					: false;
			if ( resultMatches ) {
				populateSearchResult(
					hits[ 0 ].post_content,
					hits[ 0 ].post_id,
					searchInput
				);
				return;
			}
			setSource( 'ai' );
			const result = await moduleAI.search.getSearchResult(
				searchInput,
				'helpcenter'
			);
			populateSearchResult(
				result.result[ 0 ].text,
				result.post_id,
				searchInput
			);
		} catch ( exception ) {
			setNoResult( true );
		} finally {
			setLoadingQuery( null );
			setIsLoading( false );
			setLoadingIndex( null );
		}
	};

	const debouncedResults = useMemo( () => {
		return debounce( async ( query ) => {
			if ( ! query || query.length === 0 ) {
				setMultiResults( {} );
				return;
			}
			// setLoading( true );
			setShowSuggestions( true );
			try {
				const brand = await CapabilityAPI.getBrand();
				const multiSearchResults = await fetchMultiSearchResults(
					query,
					brand
				);
				if ( multiSearchResults?.results?.[ 0 ]?.grouped_hits ) {
					setMultiResults( {
						...multiSearchResults,
						hits: multiSearchResults?.results?.[ 0 ]?.grouped_hits,
					} );
				}
			} catch ( error ) {
				console.error( 'Error fetching debounced results:', error );
			} finally {
				// setLoading( false );
				// setShowSuggestions( false );
			}
		}, 300 );
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [] );

	// Clear any debounce problems
	useEffect( () => {
		debouncedResults.cancel();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [] );
	console.log( 'reduly', resultContent );
	return (
		<>
			<div className="hc-results-container" ref={ containerRef }>
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
							loadingIndex={ loadingIndex } // Pass the loading index
							index={ index } // Pass the index of the current query
						/>
					) ) }

				{ /* Render a placeholder for the loading state if isLoading is true */ }
				{ isLoading && (
					<ResultContent
						key="loading"
						content={ null } // No content while loading
						noResult={ false }
						postId={ null }
						source="ai" // Assume loading for AI
						showFeedbackSection={ false }
						questionBlock={ loadingQuery } // Display the query being loaded
						isLoading={ isLoading }
						loadingQuery={ loadingQuery }
						loadingIndex={ loadingIndex } // Pass the loading index
						index={ resultContent.length } // Pass the index for the loading placeholder
					/>
				) }
			</div>
			{ showSuggestions && (
				<div className="suggestions-wrapper">
					{ multiResults?.hits?.length > 0 && (
						<p>
							<b>
								{ resultContent?.length > 0
									? __(
											'Common Topics',
											'wp-module-help-center'
									  )
									: __(
											'Search Suggestions',
											'wp-module-help-center'
									  ) }
							</b>
						</p>
					) }
					{ multiResults?.hits?.map( ( result, index ) => {
						console.log( 'Result', result );
						const el = document.createElement( 'span' );
						el.setAttribute( 'display', 'none' );
						el.innerHTML = result?.group_key;
						const postTitle = el.textContent || el.innerText;

						return (
							<>
								<SearchResultSuggestions
									key={ index }
									searchTitle={ postTitle }
									onGo={ () => {
										setSearchInput( postTitle );
										setShowSuggestions( false );
										populateSearchResult(
											result?.hits[ 0 ]?.document
												?.post_content,
											result?.hits[ 0 ]?.document?.id,
											postTitle
										);
									} }
								/>
							</>
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
