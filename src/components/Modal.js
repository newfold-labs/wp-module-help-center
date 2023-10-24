/* eslint-disable @wordpress/i18n-text-domain */
/* eslint-disable @wordpress/i18n-no-variables */
import { useEffect, useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { toggleHelp } from '..';
import { ReactComponent as CloseIcon } from '../icons/close.svg';
import { CapabilityAPI, LocalStorageUtils } from '../utils';

const Modal = ( {
	onClose,
	contentComponent,
	iconComponent,
	sidebarHeading,
	sidebarHeadingId,
} ) => {
	const [ brand, setBrand ] = useState( '' );

	const getBrand = async () => {
		const brandRetrieved = await CapabilityAPI.getBrand();
		setBrand( brandRetrieved.toLowerCase() );
	};

	useEffect( () => {
		const helpVisible = LocalStorageUtils.getHelpVisible();
		toggleHelp( helpVisible );
		getBrand();
	}, [] );

	const [ refresh, setRefresh ] = useState( false );

	return (
		<div className="modal">
			<div className="modal-header">
				<h3 className="heading">
					<span className="icon">{ iconComponent }</span>
					{ __( sidebarHeading, sidebarHeadingId ) }
				</h3>
				<button
					className="close-button"
					onClick={ () => {
						onClose();
						setRefresh( ! refresh );
					} }
				>
					<div className="icon-button">
						<CloseIcon />
					</div>
				</button>
			</div>
			{ contentComponent &&
				contentComponent( { onClose, refresh, setRefresh, brand } ) }
		</div>
	);
};

export default Modal;
