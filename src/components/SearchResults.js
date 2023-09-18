/* eslint-disable no-shadow */
import { debounce } from 'lodash';
import { useEffect, useState, useMemo } from '@wordpress/element';
import { useInstantSearch, useSearchBox } from 'react-instantsearch-hooks-web';
import moduleAI from '@newfold-labs/wp-module-ai';
//
import { ReactComponent as SearchIcon } from '../icons/search.svg';
//
import { SearchResult } from './SearchResult';
import { ResultContent } from './ResultContent';
import { Analytics, LocalStorageUtils } from '../utils';
import Loader from './Loader';

const SearchResults = ( props ) => {
	const [ isLoading, setIsLoading ] = useState( false );
	const [ noResult, setNoResult ] = useState( false );
	const [ searchInput, setSearchInput ] = useState( '' );
	const [ resultContent, setResultContent ] = useState( '' );
	const [ postId, setPostId ] = useState();
	const [ source, setSource ] = useState( 'kb' );
	const { query, refine, clear } = useSearchBox();
	const { results } = useInstantSearch();

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

	useEffect( () => {
		setSearchInput( '' );
		setResultContent( '' );
		refine( '' );
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [ props.refresh ] );

	useEffect( () => {
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
			refine( input );
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [] );

	const getResultMatches = ( query, tokensMatched, fieldsMatched ) => {
		const tokensPerQuery = query.split( /\s+/ ).length / tokensMatched;
		return fieldsMatched >= 1 && tokensPerQuery >= 0.75;
	};

	const getAIResult = async () => {
		setIsLoading( true );
		try {
			// Check if the algolia results are close enough
			const hits = results.hits;
			const resultMatches =
				hits.length > 0
					? getResultMatches(
							query,
							hits[ 0 ].text_match_info.tokens_matched,
							hits[ 0 ].text_match_info.fields_matched
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
				query,
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
		return debounce( function ( query ) {
			if ( query && query.length === 0 ) {
				clear();
			}
			refine( query );
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
					placeholder="Ask me anything..."
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
			<ResultContent
				content={ resultContent }
				noResult={ noResult }
				postId={ postId }
				source={ source }
			/>

			{ results.hits.length > 0 && (
				<p>
					<b>
						{ resultContent.length > 0
							? 'Other Resources'
							: 'Search Suggestions' }
					</b>
				</p>
			) }
			{ results.hits.map( ( result, index ) => {
				const el = document.createElement( 'span' );
				el.setAttribute( 'display', 'none' );
				el.innerHTML = result.post_title;
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
