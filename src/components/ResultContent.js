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
	loadingPostId, // New prop to track which postId is loading
} ) => {
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
						{ /* Only show "Loading" for the specific postId that is loading */ }
						{ isLoading &&
						source === 'ai' &&
						loadingPostId &&
						loadingPostId === postId ? (
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
