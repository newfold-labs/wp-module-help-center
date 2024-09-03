//
import Feedback from './Feedback';
import NoResults from './NoResults';
import { useEffect, useState } from 'react';
import { marked } from 'marked';

export const ResultContent = ( {
	content,
	noResult,
	postId,
	source,
	showFeedbackSection,
} ) => {
	if ( noResult && content ) {
		return (
			<p>
				<b>{ content }</b>
			</p>
		);
	}

	if ( noResult ) {
		return <NoResults />;
	}

	const MarkdownRenderer = ( { markdownText } ) => {
		const [ htmlContent, setHtmlContent ] = useState( '' );

		useEffect( () => {
			// Convert Markdown to HTML whenever markdownText changes
			const convertedHTML = marked( markdownText );
			setHtmlContent( convertedHTML );
		}, [ markdownText ] ); // Dependency array ensures this runs on markdownText change

		return <p dangerouslySetInnerHTML={ { __html: htmlContent } } />;
	};

	if ( content && content.length > 0 ) {
		return (
			<>
				<MarkdownRenderer markdownText={ content } />
				{ showFeedbackSection && content && content.length > 0 && (
					<Feedback postId={ postId } source={ source } />
				) }
			</>
		);
	}

	return <></>;
};
