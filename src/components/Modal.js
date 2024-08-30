import { useEffect, useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
//
import { ReactComponent as CloseIcon } from '../icons/close.svg';
import { ReactComponent as Help } from '../icons/helpcenter-icon.svg';
import { ReactComponent as AIStars } from '../icons/ai-stars.svg';
import HelpCenter from './HelpCenter';

import { toggleHelp } from '..';
import { CapabilityAPI, LocalStorageUtils, useRevealText } from '../utils';

const Modal = ( { onClose } ) => {
	const [ brand, setBrand ] = useState( '' );
	const [ refresh, setRefresh ] = useState( false );
	const [ startReveal, setStartReveal ] = useState( false );

	const getBrand = async () => {
		const brandRetrieved = await CapabilityAPI.getBrand();
		setBrand( brandRetrieved.toLowerCase() );
	};

	useEffect( () => {
		const helpVisible = LocalStorageUtils.getHelpVisible();
		toggleHelp( helpVisible );
		getBrand();
		if ( helpVisible ) {
			setStartReveal( helpVisible );
		}
	}, [] );

	useEffect( () => {
		const element = document.getElementById( 'nfd-help-center' );

		const checkAndSetReveal = () => {
			if ( element && element.classList.contains( 'help-container' ) ) {
				setStartReveal( true );
			}
		};

		checkAndSetReveal(); // Initial check

		// Set up MutationObserver to watch for class changes
		// eslint-disable-next-line no-undef
		const observer = new MutationObserver( ( mutationsList ) => {
			for ( const mutation of mutationsList ) {
				if ( mutation.attributeName === 'class' ) {
					checkAndSetReveal();
				}
			}
		} );

		if ( element ) {
			observer.observe( element, { attributes: true } );
		}

		// Cleanup the observer on component unmount
		return () => {
			if ( element ) {
				observer.disconnect();
			}
		};
	}, [] );

	const introText = __(
		'Hi! I’m your WordPress AI assistant. </br></br> Ask me how to do things in WordPress and I’ll provide step by step instructions.</br></br> I’m still learning so I don’t have all the answers just yet.',
		'wp-module-help-center'
	);

	const revealedIntro = useRevealText( startReveal ? introText : '', 50 );

	return (
		<div className="modal">
			<div className="modal-header">
				<h3 className="heading">
					<span className="icon">
						<Help />
					</span>
					<span>
						{ __( 'Help with WordPress', 'wp-module-help-center' ) }
					</span>
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
			<div className="helpcenter-intro">
				<div>
					<AIStars />
				</div>
				<div
					className="helpcenter-intro__text"
					dangerouslySetInnerHTML={ { __html: revealedIntro } }
				/>
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
