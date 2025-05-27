/* eslint-disable no-shadow */
import { useSelector } from 'react-redux';
import { Result } from './Result';

const ResultList = ( { wrapper, resultsContainer } ) => {
	const { resultContent, isLoading } = useSelector(
		( state ) => state.helpcenter
	);
	return (
		<>
			<div className="hc-results-container" ref={ resultsContainer }>
				{
					<Result
						content={ resultContent.resultContent }
						postId={ resultContent.postId }
						questionBlock={ resultContent.searchInput }
						wrapper={ wrapper }
						feedbackSubmitted={
							resultContent.feedbackSubmitted || false
						}
					/>
				}
				{ /* Render a placeholder for the loading state if isLoading is true */ }
				{ isLoading && (
					<Result
						key="loading"
						content={ null }
						noResult={ false }
						postId={ null }
						source="ai"
						showFeedbackSection={ false }
						wrapper={ wrapper }
						feedbackSubmitted={ false }
					/>
				) }
			</div>
		</>
	);
};

export default ResultList;
