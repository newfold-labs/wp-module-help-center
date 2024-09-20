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
	const [ showSuggestions, setShowSuggestions ] = useState( true );
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
		setIsNewResult( true );
		const helpCenterElement = document.getElementById( 'nfd-help-center' );
		if ( postId ) {
			/* if ( helpCenterElement ) {
				const viewportHeight = window.innerHeight;

				// Calculate the total scroll value (scrollHeight + (viewport height - 354))
				const scrollValue =
					helpCenterElement.scrollHeight - ( viewportHeight - 354 );

				// Scroll to the calculated position
				helpCenterElement.scrollTo( {
					bottom: scrollValue,
					behavior: 'smooth', // Smooth scrolling
				} );
			} */
			if ( helpCenterElement ) {
				// eslint-disable-next-line no-undef
				const observer = new MutationObserver( ( mutations ) => {
					mutations.forEach( ( mutation ) => {
						if ( mutation.addedNodes.length > 0 ) {
							// Loop through added nodes
							mutation.addedNodes.forEach( ( node ) => {
								// Ensure the node is an element node
								if (
									// eslint-disable-next-line no-undef
									node.nodeType === Node.ELEMENT_NODE &&
									node.classList.contains(
										'helpcenter-response-block'
									)
								) {
									// Set the height of the new element
									const viewportHeight = window.innerHeight;
									const minHeight = viewportHeight - 354;
									node.style.minHeight = `${ minHeight }px`;

									// Scroll to the bottom of the container after setting the height
									console.log("scroll heigjt : ", helpCenterElement.scrollHeight)
									helpCenterElement.scrollTo( {
										top: helpCenterElement.scrollHeight,
										behavior: 'smooth',
									} );
								}
							} );
						}
					} );
				} );

				const mainElement = document.getElementsByClassName(
					'hc-results-container'
				)[ 0 ];

				// Start observing the container for child additions
				observer.observe( mainElement, {
					childList: true, // Listen for child node additions/removals
					subtree: false, // Only observe direct children
				} );
			}
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
			const hits = multiResults.hits[ 0 ].hits;
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
					hits[ 0 ].document.post_content,
					hits[ 0 ].document.post_id,
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
			setShowSuggestions( true );
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
				}
			} catch ( error ) {
				// eslint-disable-next-line no-console
				console.error( 'Error fetching debounced results:', error );
			} finally {
				// setLoading( false );
				// setShowSuggestions( false );
			}
		}, 500 );
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [] );

	// Clear any debounce problems
	useEffect( () => {
		debouncedResults.cancel();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [] );

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
