/* eslint-disable no-shadow */
import { useSelector } from 'react-redux';
import NoResults from './NoResults';
import { Result } from './Result';

const ResultList = ( { wrapper, resultsContainer } ) => {
	const { resultContent, isLoading, isNewResult, noResult } = useSelector(
		( state ) => state.helpcenter
	);
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
							postId={ result.postId }
							showFeedbackSection={
								! result.resultContent.includes(
									'do not possess the answer'
								)
							}
							questionBlock={ result.searchInput }
							index={ index }
							wrapper={ wrapper }
							feedbackSubmitted={
								result.feedbackSubmitted || false
							}
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
						index={ resultContent.length }
						wrapper={ wrapper }
						feedbackSubmitted={ false }
					/>
				) }
				{ noResult && isNewResult && <NoResults /> }
			</div>
		</>
	);
};

export default ResultList;
