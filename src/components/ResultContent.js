import Feedback from './Feedback';
import NoResults from './NoResults';
import { useEffect, useState, useRef, useMemo } from '@wordpress/element';
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
	const isNewEntry =
		isNewResult && index === LocalStorageUtils.getResultInfo().length - 1;
	const responseRef = useRef( null );
	const [ shouldReveal, setShouldReveal ] = useState( false );

	useEffect( () => {
		if ( ( isNewEntry && responseRef.current ) || isLoading ) {
			adjustHeightAndScroll();
		}
	}, [ isNewEntry, isLoading ] );

	const adjustHeightAndScroll = () => {
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
	};

	/* Parse the html in string to a document node, replace the <p>  tags with a fragment and line break */
	const processContentForMarkdown = ( textToDisplay ) => {
		if ( textToDisplay ) {
			// eslint-disable-next-line no-undef
			const parser = new DOMParser();
			const doc = parser.parseFromString( textToDisplay, 'text/html' );

			const paragraphElements = doc.querySelectorAll( 'p' );

			paragraphElements.forEach( ( p ) => {
				// Create a DocumentFragment to hold the content and <br> tags
				const fragment = document.createDocumentFragment();

				// Append all child nodes of the <p> to the fragment
				while ( p.firstChild ) {
					fragment.appendChild( p.firstChild );
				}

				const br1 = document.createElement( 'br' );
				const br2 = document.createElement( 'br' );
				fragment.appendChild( br1 );
				fragment.appendChild( br2 );

				// Replace the <p> element with the fragment
				p.parentNode.replaceChild( fragment, p );
			} );

			const updatedContent = doc.body.innerHTML;
			return updatedContent;
		}
		return '';
	};

	const { displayedText: textToDisplay, isComplete: revealComplete } =
		useRevealText( content || '', 50, shouldReveal );

	const htmlContent = useMemo( () => {
		const processedHTMLContent = processContentForMarkdown( textToDisplay );
		const markedContent = processedHTMLContent
			? marked( processedHTMLContent )
			: '';
		return markedContent;
	}, [ textToDisplay ] );

	function renderContentOrLoading() {
		if (
			isLoading &&
			loadingQuery === questionBlock &&
			loadingIndex === index &&
			source === 'ai'
		) {
			return <div className="loading-cursor"></div>;
		} else if ( content && content.length > 0 ) {
			return (
				<p
					className="helpcenter-results"
					dangerouslySetInnerHTML={ { __html: htmlContent } }
				/>
			);
		}
		return null;
	}

	function shouldShowFeedback() {
		return (
			! noResult &&
			showFeedbackSection &&
			content &&
			revealComplete &&
			content.length > 0
		);
	}

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
						{ noResult && isNewEntry ? (
							<NoResults />
						) : (
							renderContentOrLoading()
						) }
					</div>
				</div>
				{ shouldShowFeedback() && (
					<Feedback postId={ postId } source={ source } />
				) }
			</div>
		</>
	);
};
