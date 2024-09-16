import Feedback from './Feedback';
import NoResults from './NoResults';
import { useRevealText } from '../utils';
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
	const revealedText = useRevealText( content || '', 150 );

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
										__html:
											loadingIndex === index
												? revealedText
												: content,
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
