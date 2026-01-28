import { useEffect, useRef } from '@wordpress/element';
import { useDispatch } from 'react-redux';

import { CapabilityAPI, LocalStorageUtils, adjustPadding } from '../utils';
import { useHelpCenterState } from '../hooks/useHelpCenterState';

import { helpcenterActions } from '../../store/helpcenterSlice';

import DislikeFeedbackPanel from './DislikeFeedbackPanel';
import HelpCenterIntro from './HelpCenterIntro';
import ResultList from './ResultList';
import NoResults from './ResultList/NoResults';
import SearchInput from './SearchInput';

const HelpCenter = () => {
	const dispatch = useDispatch();

	// Use reusable hook for Redux state
	const {
		visible,
		helpEnabled,
		disliked,
		noResult,
		initComplete,
		resultContent,
		isLoading,
		hasLaunchedFromTooltip,
	} = useHelpCenterState();

	const wrapper = useRef();
	const resultsContainer = useRef();

	// === useEffect: on mount ===
	useEffect(() => {
		getHelpStatus();
		// Sync visibility state with Redux when localStorage changes
		const updateVisibility = () =>
			dispatch(
				helpcenterActions.updateVisibility(
					LocalStorageUtils.getHelpVisible()
				)
			);
		window.addEventListener('storage', updateVisibility);

		// Initial sync
		updateVisibility();

		return () => {
			window.removeEventListener('storage', updateVisibility);
		};
	}, [dispatch]);

	// === useEffect: on visible ===
	useEffect(() => {
		if (visible) {
			dispatch(helpcenterActions.updateInitComplete(true));
			checkFooterVisibility();
			adjustPadding(wrapper);
			/* setTimeout( () => {
				scrollToBottom( wrapper, resultsContainer );
			}, 500 ); */
		}
	}, [visible]);

	// === useEffect: on initComplete / disliked ===
	useEffect(() => {
		if (initComplete) {
			checkFooterVisibility();
			adjustPadding(wrapper);
			/* scrollToBottom( wrapper, resultsContainer ); */
		}
	}, [initComplete, disliked]);

	const getHelpStatus = async () => {
		try {
			const response = await CapabilityAPI.getHelpCenterCapability();
			const aiResponse = CapabilityAPI.getAIHelpCenterCapability();
			// Show help center if either capability is true
			// If AI capability is true, HelpCenterChat will show AI chat instead
			// but we still need helpEnabled to be true so the modal/content area renders
			dispatch(
				helpcenterActions.updateHelpEnabled(response || aiResponse)
			);
		} catch {
			// On error, check AI capability as fallback
			const aiResponse = CapabilityAPI.getAIHelpCenterCapability();
			dispatch(helpcenterActions.updateHelpEnabled(aiResponse));
		}
	};

	const checkFooterVisibility = () => {
		dispatch(
			helpcenterActions.setIsFooterVisible(
				resultContent.length < 1 || disliked
			)
		);
	};

	// Check both capabilities - show if either is true
	const canAccessAIHelpCenter = CapabilityAPI.getAIHelpCenterCapability();
	const shouldShow = (helpEnabled || canAccessAIHelpCenter) && visible;

	if (!shouldShow) {
		return null;
	}

	const renderResultContainer = () => {
		if (noResult) {
			return (
				<NoResults hasLaunchedFromTooltip={hasLaunchedFromTooltip} />
			);
		}
		if (disliked) {
			return <DislikeFeedbackPanel />;
		}
		return (
			<>
				{resultContent?.length < 1 && !isLoading && <HelpCenterIntro />}
				<ResultList
					wrapper={wrapper}
					resultsContainer={resultsContainer}
				/>
			</>
		);
	};

	return (
		<div
			className="nfd-help-center"
			id="helpcenterResultsWrapper"
			ref={wrapper}
			style={
				hasLaunchedFromTooltip
					? { height: window.innerHeight - 100 }
					: undefined
			}
		>
			{renderResultContainer()}
			{!hasLaunchedFromTooltip && <SearchInput />}
		</div>
	);
};

export default HelpCenter;
