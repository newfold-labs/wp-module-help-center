/* eslint-disable no-shadow */
import { useSelector } from 'react-redux';
import '../../styles/result.scss';
import { Result } from './Result';

const ResultList = ({ wrapper, resultsContainer }) => {
	const { resultContent, isLoading } = useSelector(
		(state) => state.helpcenter
	);

	return (
		<>
			<div className="hc-results-container" ref={resultsContainer}>
				{isLoading ? (
					<div>
						<div className="skeleton skeleton-text" />
						<div
							className="skeleton skeleton-text"
							style={{
								margin: 0,
								marginTop: '30px',
								borderRadius: '4px 4px 0 0',
							}}
						/>
						<div
							className="skeleton skeleton-subtext"
							style={{ borderRadius: ' 0 0 4px 4px' }}
						/>
						<br />
						<div className="skeleton skeleton-card" />
					</div>
				) : (
					<Result
						content={resultContent.resultContent}
						postId={resultContent.postId}
						questionBlock={resultContent.searchInput}
						wrapper={wrapper}
						feedbackSubmitted={
							resultContent.feedbackSubmitted || false
						}
					/>
				)}
			</div>
		</>
	);
};

export default ResultList;
