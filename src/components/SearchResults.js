/* eslint-disable no-shadow */
import { debounce } from 'lodash';
import { useEffect, useState, useMemo } from '@wordpress/element';
import moduleAI from '@newfold-labs/wp-module-ai';
//
import { ReactComponent as SearchIcon } from '../icons/search.svg';
//
import { SearchResult } from './SearchResult';
import { ResultContent } from './ResultContent';
import { Analytics, LocalStorageUtils, CapabilityAPI } from '../utils';
import Loader from './Loader';
import { ClipLoader } from 'react-spinners';
import { __ } from '@wordpress/i18n';

const SearchResults = ( props ) => {
	const [ isLoading, setIsLoading ] = useState( false );
	const [ noResult, setNoResult ] = useState( false );
	const [ searchInput, setSearchInput ] = useState( '' );
	const [ resultContent, setResultContent ] = useState( '' );
	const [ postId, setPostId ] = useState();
	const [ source, setSource ] = useState( 'kb' );
	const [ multiResults, setMultiResults] = useState({});
	const [loading, setLoading] = useState(false);

	const populateSearchResult = ( resultContent, postId, searchInput ) => {
		const resultContentFormatted = resultContent.replace( /\n/g, '<br />' );
		setResultContent( resultContentFormatted );
		setPostId( postId );
		LocalStorageUtils.persistResult( resultContentFormatted, postId );
		LocalStorageUtils.persistSearchInput( searchInput );
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
			const response = await fetch('/wp-json/newfold-multi-search/v1/multi_search', {
			  method: 'POST',
			  headers: {
				'Content-Type': 'application/json',
			  },
			  body: JSON.stringify({ query, brand }),
			});
			if (!response.ok) {
			  throw new Error('Network response was not ok');
			}
			return await response.json();
		} catch (error) {
			console.error('Error fetching multi-search results:', error);
			return {};
		}
	};

	useEffect( () => {
		setSearchInput( '' );
		setResultContent( '' );
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [ props.refresh ] );

	useEffect( () => {
		const fetchInitialData = async () => {
			try {
				// Populate the results from local storage if they exist
				const { content: currentResultContent, postId: currentResultPostId } =
			LocalStorageUtils.getResultInfo();
				if ( currentResultContent ) {
					setResultContent( currentResultContent );
				}
				if ( currentResultPostId ) {
					setPostId( currentResultPostId );
				}
				const input = LocalStorageUtils.getSearchInput();
				
				if ( input ) {
					setSearchInput( input );
					const brand = await CapabilityAPI.getBrand();
					const multiSearchResults = await fetchMultiSearchResults( input, brand );
					setMultiResults({...multiSearchResults, hits: multiSearchResults?.results?.[0]?.grouped_hits});
				}
			} catch (error) {
				console.error('Error fetching initial data:', error);
			}
		};
		
		fetchInitialData();
	 	// eslint-disable-next-line react-hooks/exhaustive-deps
	 }, [] );

	const getResultMatches = ( query, tokensMatched, fieldsMatched ) => {
		const tokensPerQuery = tokensMatched / query.split( /\s+/ ).length;
		return fieldsMatched >= 1 && tokensPerQuery >= 0.99;
	};

	const getAIResult = async () => {
		setIsLoading( true );
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
			setIsLoading( false );
		}
	};

	const debouncedResults = useMemo( () => {
		return debounce( async ( query ) => {
			if ( !query || query.length === 0 ) {
				setMultiResults({});
				return;
			}
			setLoading(true);
			try {
				const brand = await CapabilityAPI.getBrand();
				const multiSearchResults = await fetchMultiSearchResults( query, brand );
				if(multiSearchResults?.results?.[0]?.grouped_hits) {
					setMultiResults({...multiSearchResults, hits: multiSearchResults?.results?.[0]?.grouped_hits});
				}
			} catch (error) {
				console.error('Error fetching debounced results:', error);
			}
			finally {
				setLoading(false);
			}
		}, 300 );
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [] );

	// Clear any debounce problems
	useEffect( () => {
		debouncedResults.cancel();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [] );

	if ( isLoading ) {
		return (
			<>
				<Loader />
			</>
		);
	}

	return (
		<>
			<div className="search-container">
				<button
					onClick={ () => {
						document.getElementById( 'search-input-box' ).focus();
					} }
				>
					<SearchIcon />
				</button>
				<input
					type="text"
					id="search-input-box"
					style={ {
						flexGrow: 2,
					} }
					value={ searchInput }
					maxLength="144"
					placeholder={ __(
						'Ask me anything…',
						'wp-module-help-center'
					) }
					onChange={ ( e ) => {
						setSearchInput( e.target.value );
						populateSearchResult( '', undefined, e.target.value );
						setNoResult( false );
						debouncedResults( e.target.value );
					} }
					onKeyDown={ async ( e ) => {
						if ( e.key === 'Enter' ) {
							await getAIResult();
						}
					} }
				/>
			</div>
			<div className="attribute">
				<p>
					<span>{ searchInput ? searchInput.length : 0 }/144</span>
				</p>
			</div>
			{loading ? (
				<ClipLoader /> // show loader when loading is true
			) : (
				<ResultContent
					content={ resultContent }
					noResult={ noResult }
					postId={ postId }
					source={ source }
					showFeedbackSection={! resultContent.includes( 'do not possess the answer' ) }
				/>
			)}
			{ multiResults?.hits?.length > 0 && (
				<p>
					<b>
						{ resultContent?.length > 0
							? __( 'Other Resources', 'wp-module-help-center' )
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
						<SearchResult
							key={ index }
							searchTitle={ postTitle }
							onGo={ () => {
								setSearchInput( postTitle );
								populateSearchResult(
									result.post_content,
									result.post_id,
									postTitle
								);
							} }
						/>
					</>
				);
			} ) }
		</>
	);
};

export default SearchResults;
