/* eslint-disable no-shadow */
import { Result } from './Result';
import NoResults from './NoResults';

const ResultList = ( {
	wrapper,
	noResult,
	loadingQuery,
	loadingIndex,
	isNewResult,
	isLoading,
	source,
	resultContent,
	resultsContainer,
	searchInput,
	setDisliked,
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
						<Result
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
							setDisliked={ setDisliked }
						/>
					) ) }
				{ /* Render a placeholder for the loading state if isLoading is true */ }
				{ isLoading && (
					<Result
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
						setDisliked={ setDisliked }
					/>
				) }
				{ noResult && isNewResult && (
					<NoResults isNewResult={ isNewResult } />
				) }
			</div>
		</>
	);
};

export default ResultList;
