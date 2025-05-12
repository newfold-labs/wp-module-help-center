import { useEffect, useMemo, useRef, useState } from '@wordpress/element';
import { marked } from 'marked';
import {
	LocalStorageUtils,
	processContentForMarkdown,
	useRevealText,
} from '../../utils';
import ResultContent from './ResultContent';
import ResultFeedback from './ResultFeedback';
import ResultHeader from './ResultHeader';

export const Result = ( {
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
	wrapper,
	feedbackSubmitted,
	setDisliked,
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
		const minHeight = viewportHeight - 170;
		responseRef.current.style.minHeight = `${ minHeight }px`;
		const scrollDistance = wrapper.current.scrollHeight;
		wrapper.current.scrollBy( {
			top: scrollDistance,
			left: 0,
			behavior: 'smooth',
		} );

		setShouldReveal( true );
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

	function shouldShowFeedback() {
		return (
			! noResult &&
			! feedbackSubmitted &&
			showFeedbackSection &&
			content &&
			revealComplete &&
			content.length > 0
		);
	}

	return (
		<div ref={ responseRef } className="helpcenter-response-block">
			<ResultHeader
				noResult={ noResult }
				isNewEntry={ isNewEntry }
				questionBlock={ questionBlock }
			/>
			<ResultContent
				noResult={ noResult }
				isNewEntry={ isNewEntry }
				content={ htmlContent }
				isLoading={ isLoading }
				loadingQuery={ loadingQuery }
				loadingIndex={ loadingIndex }
				index={ index }
				questionBlock={ questionBlock }
				source={ source }
			/>
			{ shouldShowFeedback() && (
				<ResultFeedback
					postId={ postId }
					source={ source }
					setDisliked={ setDisliked }
				/>
			) }
		</div>
	);
};
