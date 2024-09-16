/* eslint-disable react-hooks/rules-of-hooks */
import Feedback from './Feedback';
import NoResults from './NoResults';
import { useRevealText, LocalStorageUtils } from '../utils';
import { ReactComponent as UserAvatar } from '../icons/user-avatar.svg';
import { ReactComponent as AIStars } from '../icons/ai-stars.svg';

export const ResultContent = ( {
	content,
	noResult,
	postId,
	source,
	showFeedbackSection,
	questionBlock,
	isLoading,
	loadingQuery,
	loadingIndex,
	index,
	isNewResult,
} ) => {
	const storedResultsLength = LocalStorageUtils.getResultInfo().length;

	// Only apply reveal effect if the result is new and it's the last result
	const isNewEntry = isNewResult && index === storedResultsLength - 1;

	// Apply the reveal effect for new results, otherwise show content directly
	const textToDisplay = isNewEntry
		? useRevealText( content || '', 150 )
		: content;

	if ( noResult ) {
		return <NoResults />;
	}

	return (
		<>
			<div className="helpcenter-response-block">
				<div className="helpcenter-question-block">
					<div className="helpcenter-question__user-avatar">
						<UserAvatar />
					</div>
					<div>{ questionBlock }</div>
				</div>
				<div className="helpcenter-result-block">
					<div className="helpcenter-result-block__aistars">
						<AIStars />
					</div>
					<div>
						{ /* Only show "Loading" for the most recent query at the correct index */ }
						{ isLoading &&
						loadingQuery === questionBlock &&
						loadingIndex === index &&
						source === 'ai' ? (
							<div className="loading-cursor"></div>
						) : (
							content &&
							content.length > 0 && (
								<p
									className="helpcenter-results"
									dangerouslySetInnerHTML={ {
										__html: textToDisplay,
									} }
								/>
							)
						) }
					</div>
				</div>
				{ showFeedbackSection && content && content.length > 0 && (
					<Feedback postId={ postId } source={ source } />
				) }
			</div>
		</>
	);
};
