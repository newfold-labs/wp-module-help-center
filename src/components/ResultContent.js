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

	const { displayedText: textToDisplay, isComplete: revealComplete } =
		useRevealText( content || '', 50, shouldReveal );

	const htmlContent = useMemo(
		() => marked( textToDisplay ),
		[ textToDisplay ]
	);

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
