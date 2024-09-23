/* eslint-disable react-hooks/rules-of-hooks */
import Feedback from './Feedback';
import NoResults from './NoResults';
import { useEffect, useState, useRef } from '@wordpress/element';
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
	searchInput,
} ) => {
	const storedResultsLength = LocalStorageUtils.getResultInfo().length;

	const isNewEntry = isNewResult && index === storedResultsLength - 1;

	// Get the viewport height
	const viewportHeight = window.innerHeight;

	// const [ shouldReveal, setShouldReveal ] = useState( false );
	const responseRef = useRef( null );

	/* // Set height and scroll into view BEFORE the reveal effect starts
	useEffect( () => {
		if ( isNewEntry && responseRef.current ) {
			// Set the height of the new element to the viewport height
			responseRef.current.style.minHeight = `${ viewportHeight }px`;

			// Scroll the response block into view at the top of the window
			responseRef.current.scrollIntoView( {
				behavior: 'smooth', // Smooth scroll
				block: 'end', // Align with the top of the viewport
			} );
		}
	}, [ isNewEntry, viewportHeight ] ); */
	// Scroll logic inside the child component using the containerRef passed from the parent
	// Scroll logic inside the child component using the container's ID
	// Manually scroll the element inside the container
	/* useEffect( () => {
		// Get the scrollable container by ID
		const container = document.getElementById( 'nfd-help-center' );

		if ( responseRef.current && container && isNewEntry ) {
			// Get the target element's position relative to the container
			const elementTop = responseRef.current.getBoundingClientRect().top;
			const containerTop = container.getBoundingClientRect().top;

			// Calculate the scroll position within the container
			const scrollToPosition = container.scrollHeight;
			// Scroll the container to the calculated position
			container.scrollTo( {
				top: scrollToPosition,
				behavior: 'smooth', // Smooth scroll
			} );
			setTimeout( () => {
				// Once scroll is complete, start the reveal effect
				setShouldReveal( true );
			}, 5000 );
		}
	}, [ isNewEntry ] ); */

	const { displayedText: textToDisplay, isComplete: revealComplete } =
		useRevealText( content || '', 50, isNewEntry );

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

	return (
		<>
			<div ref={ responseRef } className="helpcenter-response-block">
				<div className="helpcenter-question-block">
					<div className="helpcenter-question__user-avatar">
						<UserAvatar />
					</div>
					<div>
						{ noResult && isNewEntry ? searchInput : questionBlock }
					</div>
				</div>
				<div className="helpcenter-result-block">
					<div className="helpcenter-result-block__aistars">
						<AIStars />
					</div>
					<div>
						{ /* Show NoResults only for the most recent entry with no results */ }
						{ noResult && isNewEntry ? (
							<NoResults />
						) : (
							<>
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
							</>
						) }
					</div>
				</div>
				{ ! noResult &&
					showFeedbackSection &&
					content &&
					revealComplete &&
					content.length > 0 && (
						<Feedback postId={ postId } source={ source } />
					) }
			</div>
		</>
	);
};
