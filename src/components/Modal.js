import { useEffect, useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
//
import { ReactComponent as CloseIcon } from '../icons/close.svg';
import { ReactComponent as Help } from '../icons/helpcenter-icon.svg';
import HelpCenter from './HelpCenter';

import { toggleHelp } from '..';
import { CapabilityAPI, LocalStorageUtils } from '../utils';

const Modal = ( { onClose } ) => {
	const [ brand, setBrand ] = useState( '' );
	const [ refresh, setRefresh ] = useState( false );

	const getBrand = async () => {
		const brandRetrieved = await CapabilityAPI.getBrand();
		setBrand( brandRetrieved.toLowerCase() );
	};

	useEffect( () => {
		const helpVisible = window.newfoldHelpCenter?.closeOnLoad
			? false
			: LocalStorageUtils.getHelpVisible();
		toggleHelp( helpVisible );
		getBrand();
	}, [] );

	return (
		<div className="nfd-hc-modal">
			<div className="nfd-hc-modal__header">
				<h3 className="nfd-hc-modal__header__heading">
					<span className="nfd-hc-modal__header__heading__icon">
						<Help />
					</span>
					<span>
						{ __( 'Help with WordPress', 'wp-module-help-center' ) }
					</span>
				</h3>
				<button
					className="nfd-hc-modal__header__close-button"
					onClick={ () => {
						onClose();
						setRefresh( ! refresh );
					} }
				>
					<div className="nfd-hc-modal__header__close-button__icon-button">
						<CloseIcon />
					</div>
				</button>
			</div>
			<HelpCenter
				closeHelp={ () => {
					onClose();
					setRefresh( ! refresh );
				} }
				refresh={ refresh }
				brand={ brand }
			/>
		</div>
	);
};

export default Modal;
