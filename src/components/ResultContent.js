import Feedback from './Feedback';
import NoResults from './NoResults';
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
} ) => {
	if ( noResult ) {
		return <NoResults />;
	}
	console.log( 'source', source );
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
							<p>Loading</p>
						) : (
							content &&
							content.length > 0 && (
								<p
									className="helpcenter-results"
									dangerouslySetInnerHTML={ {
										__html: content,
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
