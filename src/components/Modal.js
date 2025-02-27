import { useEffect } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { ReactComponent as CloseIcon } from '../icons/close.svg';
import { ReactComponent as Help } from '../icons/helpcenter-icon.svg';
import HelpCenter from './HelpCenter';
import Footer from './Footer';

import { toggleHelp } from '..';
import { LocalStorageUtils } from '../utils';

const Modal = ( { onClose } ) => {
	useEffect( () => {
		const helpVisible = window.newfoldHelpCenter?.closeOnLoad
			? false
			: LocalStorageUtils.getHelpVisible();
		toggleHelp( helpVisible );
	}, [] );

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
						{ __( 'Help with WordPress', 'wp-module-help-center' ) }
					</span>
				</h3>
				<button
					aria-label={ __(
						'Close Help Modal',
						'wp-module-help-center'
					) }
					title={ __( 'Close Help Modal', 'wp-module-help-center' ) }
					className="nfd-hc-modal__header__close-button"
					onClick={ () => {
						onClose();
					} }
				>
					<CloseIcon aria-hidden="true" />
				</button>
			</div>
			<div
				id="helpcenter-modal-description"
				className="nfd-hc-modal__content"
			>
				<HelpCenter />
			</div>
			<Footer />
		</div>
	);
};

export default Modal;
