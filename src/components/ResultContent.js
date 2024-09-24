/* eslint-disable react-hooks/rules-of-hooks */
import Feedback from './Feedback';
import NoResults from './NoResults';
import { useEffect, useState, useRef } from '@wordpress/element';
import { useRevealText, LocalStorageUtils } from '../utils';
import { ReactComponent as UserAvatar } from '../icons/user-avatar.svg';
import { ReactComponent as AIStars } from '../icons/ai-stars.svg';
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

	const [ shouldReveal, setShouldReveal ] = useState( false );
	const responseRef = useRef( null );

	useEffect( () => {
		if ( ( isNewEntry && responseRef.current ) || isLoading ) {
			const viewportHeight = window.innerHeight;
			const minHeight = viewportHeight - 332;
			responseRef.current.style.minHeight = `${ minHeight }px`;
			const helpcenterResultsWrapper = document.getElementById(
				'helpcenterResultsWrapper'
			);
			const scrollDistance = helpcenterResultsWrapper.scrollHeight;
			helpcenterResultsWrapper.scrollBy( {
				top: scrollDistance,
				left: 0,
				behavior: 'smooth',
			} );

			setShouldReveal( true );
		}
	}, [ isNewEntry, isLoading ] );

	const { displayedText: textToDisplay, isComplete: revealComplete } =
		useRevealText( content || '', 50, shouldReveal && isNewEntry );

	const MarkdownRenderer = ( { markdownText } ) => {
		const [ htmlContent, setHtmlContent ] = useState( '' );

		useEffect( () => {
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
			<div
				ref={ responseRef }
				className={
					isNewEntry
						? 'helpcenter-response-block last-block'
						: 'helpcenter-response-block'
				}
			>
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
