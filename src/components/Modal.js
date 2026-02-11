import { useEffect, useCallback } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { ReactComponent as CloseIcon } from '../icons/close.svg';
import { ReactComponent as Help } from '../icons/helpcenter-chat-bubble-icon.svg';
import Footer from './Footer';
import HelpCenterChat from './HelpCenterChat';
import { HelpCenterChatProvider } from '../context/HelpCenterChatContext';

import { useDispatch } from 'react-redux';
import { toggleHelp } from '..';
import { helpcenterActions } from '../../store/helpcenterSlice';
import {
	getHelpcenterOption,
	LocalStorageUtils,
	CapabilityAPI,
} from '../utils';
import { useHelpCenterState } from '../hooks/useHelpCenterState';
import { shouldShowFooter } from '../utils/footerUtils';

const Modal = ({ onClose }) => {
	const dispatch = useDispatch();

	// Use reusable hook for Redux state
	const { isFooterVisible, hasLaunchedFromTooltip } = useHelpCenterState();

	// Check capability to determine which flow is active
	// HelpCenterChat renders its own Footer when capability is true
	// Legacy HelpCenter flow (when capability is false) needs Footer from Modal.js
	const canAccessAIHelpCenter = CapabilityAPI.getAIHelpCenterCapability();

	// Use reusable utility function for footer visibility logic
	const showFooter = shouldShowFooter({
		isFooterVisible,
		hasLaunchedFromTooltip,
		canAccessAIHelpCenter,
	});

	// Handler for closing the modal - used by both legacy close button and AI chat header
	const handleClose = useCallback(() => {
		dispatch(helpcenterActions.resetState());
		onClose();
	}, [dispatch, onClose]);

	useEffect(() => {
		dispatch(
			helpcenterActions.initialDataSet({
				isFooterVisible: LocalStorageUtils.getResultInfo()?.length < 1,
				SearchInput: LocalStorageUtils.getSearchInput() || '',
			})
		);
		const helpVisible = window.newfoldHelpCenter?.closeOnLoad
			? false
			: LocalStorageUtils.getHelpVisible();
		toggleHelp(helpVisible);
	}, []);

	useEffect(() => {
		let data = [];
		async function fetchData() {
			data = await getHelpcenterOption();
			if (data) {
				dispatch(helpcenterActions.updateHelpResultHistoryFromDB(data));
			}
		}
		fetchData();
	}, []);

	return (
		<div
			role="dialog"
			aria-labelledby="helpcenter-modal-heading"
			aria-describedby="helpcenter-modal-description"
			aria-modal="true"
			className="nfd-hc-modal"
		>
			{/* Header - hidden for AI Help Center (which has its own ChatHeader) */}
			{!canAccessAIHelpCenter && (
				<>
					<div className="nfd-hc-modal__header">
						<h3
							id="helpcenter-modal-heading"
							className="nfd-hc-modal__header__heading"
						>
							<span className="nfd-hc-modal__header__heading__icon">
								<Help />
							</span>
							<span>
								{__('Help with WordPress', 'wp-module-help-center')}
							</span>
						</h3>

						{hasLaunchedFromTooltip && (
							<button
								className="nfd-hc-modal__header__minimize-button"
								aria-label={__(
									'Minimize HelpCenter',
									'wp-module-help-center'
								)}
								title={__(
									'Minimize HelpCenter',
									'wp-module-help-center'
								)}
								onClick={() => {
									dispatch(
										helpcenterActions.updateFloatingIconVisibilty(
											true
										)
									);
									toggleHelp(false);
								}}
							></button>
						)}
						<button
							aria-label={__('Close Help Modal', 'wp-module-help-center')}
							title={__('Close Help Modal', 'wp-module-help-center')}
							className="nfd-hc-modal__header__close-button"
							onClick={handleClose}
						>
							<CloseIcon aria-hidden="true" />
						</button>
					</div>
					<div className="nfd-hc-seperator">
						<hr />
					</div>
				</>
			)}
			<div
				id="helpcenter-modal-description"
				className="nfd-hc-modal__content"
			>
				{/* HelpCenterChat handles capability check internally and renders appropriate component */}
				{/* When capability is false, it renders legacy HelpCenter component */}
				{/* When capability is true, it renders new AI chat with its own header */}
				<HelpCenterChatProvider value={{ onClose: handleClose }}>
					<HelpCenterChat />
				</HelpCenterChatProvider>
			</div>
			{/* Footer for legacy HelpCenter flow only - HelpCenterChat manages its own Footer when enabled */}
			{/* Only show footer when capability is OFF (legacy flow) */}
			{showFooter && !canAccessAIHelpCenter && <Footer />}
		</div>
	);
};

export default Modal;
