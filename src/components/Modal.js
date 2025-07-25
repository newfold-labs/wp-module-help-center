import { useEffect } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { ReactComponent as CloseIcon } from '../icons/close.svg';
import { ReactComponent as Help } from '../icons/helpcenter-chat-bubble-icon.svg';
import Footer from './Footer';
import HelpCenter from './HelpCenter';

import { useDispatch, useSelector } from 'react-redux';
import { toggleHelp } from '..';
import { helpcenterActions } from '../../store/helpcenterSlice';
import { getHelpcenterOption, LocalStorageUtils } from '../utils';

const Modal = ({ onClose }) => {
	const dispatch = useDispatch();
	const { isFooterVisible, hasLaunchedFromTooltip } = useSelector(
		(state) => state.helpcenter
	);
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
					{
						// only for testing
					}
					<div
						className="nfd-help-center-tip"
						data-post-id="111456"
						id="help-center-tooltip"
						style={{ display: 'none' }}
					>
						?
					</div>
				</h3>
				<button
					aria-label={__('Close Help Modal', 'wp-module-help-center')}
					title={__('Close Help Modal', 'wp-module-help-center')}
					className="nfd-hc-modal__header__close-button"
					onClick={() => {
						dispatch(helpcenterActions.resetState());
						onClose();
					}}
				>
					<CloseIcon aria-hidden="true" />
				</button>
			</div>
			<div className="nfd-hc-seperator">
				<hr />
			</div>
			<div
				id="helpcenter-modal-description"
				className="nfd-hc-modal__content"
			>
				<HelpCenter />
			</div>
			{isFooterVisible && !hasLaunchedFromTooltip && <Footer />}
		</div>
	);
};

export default Modal;
