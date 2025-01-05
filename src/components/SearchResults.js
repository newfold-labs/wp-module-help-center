/* eslint-disable no-shadow */
import { SearchResultSuggestions } from './SearchResultSuggestions';
import { ResultContent } from './ResultContent';
import { __ } from '@wordpress/i18n';

const SearchResults = ( {
	wrapper,
	noResult,
	loadingQuery,
	loadingIndex,
	isNewResult,
	isLoading,
	source,
	resultContent,
	resultsContainer,
	showSuggestions,
	suggestionsRef,
	multiResults,
	handleSuggestionsClick,
	searchInput,
} ) => {
	return (
		<>
			<div
				className="hc-results-container"
				ref={ resultsContainer }
				style={ { visibility: 'hidden' } }
			>
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
							wrapper={ wrapper }
							feedbackSubmitted={
								result.feedbackSubmitted || false
							}
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
						wrapper={ wrapper }
						feedbackSubmitted={ false }
					/>
				) }
			</div>
			{ showSuggestions && (
				<div
					className="suggestions-wrapper"
					id="suggestionsWrapper"
					ref={ suggestionsRef }
				>
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
						const postTitle = result?.group_key[ 0 ];

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
		</>
	);
};

export default SearchResults;
