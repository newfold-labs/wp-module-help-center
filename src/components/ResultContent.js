/* eslint-disable react-hooks/rules-of-hooks */
import Feedback from './Feedback';
import NoResults from './NoResults';
import { useEffect, useState } from '@wordpress/element';
import { useRevealText, LocalStorageUtils } from '../utils';
import { ReactComponent as UserAvatar } from '../icons/user-avatar.svg';
import { ReactComponent as AIStars } from '../icons/ai-stars.svg';
// eslint-disable-next-line import/no-extraneous-dependencies
import { marked } from 'marked';

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

	const isNewEntry = isNewResult && index === storedResultsLength - 1;

	const textToDisplay = useRevealText( content || '', 150, isNewEntry );

	// Markdown rendering logic with state
	const MarkdownRenderer = ( { markdownText } ) => {
		const [ htmlContent, setHtmlContent ] = useState( '' );

		useEffect( () => {
			// Convert Markdown to HTML whenever markdownText changes
			const convertedHTML = marked( markdownText );
			setHtmlContent( convertedHTML );
		}, [ markdownText ] );

		return (
			<p
				className="helpcenter-results"
				dangerouslySetInnerHTML={ { __html: htmlContent } }
			/>
		);
	};

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
								<>
									{ /* If content is Markdown, render it using MarkdownRenderer */ }
									<MarkdownRenderer
										markdownText={ textToDisplay }
									/>
								</>
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
