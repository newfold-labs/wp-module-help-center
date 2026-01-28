import { useEffect, useMemo, useRef, useState } from '@wordpress/element';
import { useDispatch } from 'react-redux';
import { helpcenterActions } from '../../../store/helpcenterSlice';
import { processContentForMarkdown, useRevealText } from '../../utils';
import { useHelpCenterState } from '../../hooks/useHelpCenterState';
import BackButton from '../BackButton';
import ResultContent from './ResultContent';
import ResultFeedback from './ResultFeedback';
import ResultHeader from './ResultHeader';

export const Result = ({
	content,
	postId,
	source,
	questionBlock,
	index,
	wrapper,
	feedbackSubmitted,
}) => {
	const {
		isLoading,
		isNewResult,
		noResult,
		showBackButton,
		hasLaunchedFromTooltip,
	} = useHelpCenterState();
	const isNewEntry = isNewResult;
	const responseRef = useRef(null);
	const [shouldReveal, setShouldReveal] = useState(false);
	const dispatch = useDispatch();
	useEffect(() => {
		if ((isNewEntry && responseRef.current) || isLoading) {
			adjustHeightAndScroll();
		}
	}, [isNewEntry, isLoading]);

	const adjustHeightAndScroll = () => {
		const viewportHeight = window.innerHeight;
		const minHeight = viewportHeight - 255;
		responseRef.current.style.minHeight = `${minHeight}px`;
		const scrollDistance = wrapper.current.scrollHeight;
		wrapper.current.scrollBy({
			top: scrollDistance,
			left: 0,
			behavior: 'smooth',
		});
		setShouldReveal(true);
	};

	const startReveal = isNewResult ? shouldReveal : false;
	const { displayedText: textToDisplay, isComplete: revealComplete } =
		useRevealText(content || '', 50, startReveal);

	const htmlContent = useMemo(() => {
		const processedHTMLContent = processContentForMarkdown(textToDisplay);
		return processedHTMLContent;
	}, [textToDisplay]);

	function shouldShowFeedback() {
		return (
			!noResult &&
			feedbackSubmitted === null &&
			content &&
			revealComplete &&
			content.length > 0 &&
			!hasLaunchedFromTooltip
		);
	}

	return (
		<div ref={responseRef} className="helpcenter-response-block">
			{showBackButton && !hasLaunchedFromTooltip && (
				<BackButton
					handleBackClick={() => {
						dispatch(helpcenterActions.goBackInHistory());
					}}
				/>
			)}
			<ResultHeader noResult={noResult} questionBlock={questionBlock} />
			<ResultContent
				content={htmlContent}
				index={index}
				questionBlock={questionBlock}
				source={source}
			/>
			{shouldShowFeedback() && (
				<ResultFeedback postId={postId} source={source} />
			)}
		</div>
	);
};
