// eslint-disable-next-line import/no-extraneous-dependencies
import 'regenerator-runtime/runtime';
import { createRoot, render } from '@wordpress/element';

import { subscribe } from '@wordpress/data';
//
import domReady from '@wordpress/dom-ready';
import { HiiveAnalytics } from '@newfold-labs/js-utility-ui-analytics';
//
import Modal from './components/Modal';
import { ReactComponent as Help } from './icons/help-plugin-sidebar-icon.svg';
import { Analytics, LocalStorageUtils } from './utils';
import '../styles.scss';

domReady( () => {
	// Run only once DOM is ready, else this won't work.
	if ( window?.nfdHelpCenter?.restUrl ) {
		HiiveAnalytics.initialize( {
			namespace: 'wonder_help',
			urls: {
				single:
					window.nfdHelpCenter.restUrl + '/newfold-data/v1/events',
			},
		} );
	}
} );

const wpContentContainer = document.getElementById( 'wpcontent' );

export const toggleHelp = ( visible ) => {
	wpContentContainer.classList.toggle( 'wpcontent-container', visible );
	const nfdHelpContainer = document.getElementById( 'nfd-help-center' );
	nfdHelpContainer.classList.toggle( 'help-container', visible );
	LocalStorageUtils.updateHelpVisible( visible );
	window.dispatchEvent( new Event( 'storage' ) );
};

const toggleHelpViaLocalStorage = () => {
	const helpVisible = LocalStorageUtils.getHelpVisible();
	if ( Object.is( helpVisible, undefined ) ) {
		toggleHelp( true );
		Analytics.sendEvent( 'help_sidebar_opened', {
			page: window.location.href.toString(),
		} );
		return;
	}
	if ( ! helpVisible ) {
		Analytics.sendEvent( 'help_sidebar_opened', {
			page: window.location.href.toString(),
		} );
	}
	toggleHelp( ! helpVisible );
};

window.newfoldEmbeddedHelp = {
	toggleNFDLaunchedEmbeddedHelp: () => {
		toggleHelpViaLocalStorage();
	},
	renderEmbeddedHelp: () => {
		const helpContainer = document.createElement( 'div' );
		helpContainer.id = 'nfd-help-center';
		helpContainer.style.display = 'none';
		wpContentContainer.appendChild( helpContainer );
		const DOM_TARGET = document.getElementById( 'nfd-help-center' );
		if ( null !== DOM_TARGET ) {
			if ( 'undefined' !== createRoot ) {
				// WP 6.2+ only
				createRoot( DOM_TARGET ).render(
					<Modal
						onClose={ () => {
							toggleHelp( false );
						} }
					/>
				);
			} else if ( 'undefined' !== render ) {
				render(
					<Modal
						onClose={ () => {
							toggleHelp( false );
						} }
					/>,
					DOM_TARGET
				);
			}
		}
	},
};

//For rendering embedded help in Add, edit and View Pages
/* Using the subscribe from the store to keep the UI persistent */
const unsubscribe = subscribe( () => {
	const wrapper = document.getElementById( 'nfd-help-menu-button-wrapper' );

	if ( wrapper ) {
		unsubscribe(); // Unsubscribe from the state changes
		return;
	}

	domReady( () => {
		const editorToolbarSettings = document.querySelector(
			'.edit-post-header__settings'
		);

		if ( ! editorToolbarSettings ) {
			return;
		}

		// Create wrapper to fill with the button
		const buttonWrapper = document.createElement( 'div' );

		buttonWrapper.id = 'nfd-help-menu-button-wrapper';
		buttonWrapper.classList.add( 'nfd-help-menu-button-wrapper' );
		const moreMenuDropdown = editorToolbarSettings.querySelector(
			'.components-dropdown-menu.interface-more-menu-dropdown'
		);

		if ( moreMenuDropdown ) {
			editorToolbarSettings.insertBefore(
				buttonWrapper,
				moreMenuDropdown
			);
		} else {
			editorToolbarSettings.appendChild( buttonWrapper );
		}

		const helpMenuButton = (
			<button
				className="components-button has-icon"
				onClick={ () => {
					window.newfoldEmbeddedHelp.toggleNFDLaunchedEmbeddedHelp();
				} }
			>
				<Help />
			</button>
		);

		render(
			helpMenuButton,
			document.getElementById( 'nfd-help-menu-button-wrapper' )
		);
	} );
} );

window.newfoldEmbeddedHelp.renderEmbeddedHelp();

/* The method added to the window object can be used to open the help center pop and enter the text/query clicked */

window.newfoldEmbeddedHelp.launchNFDEmbeddedHelpQuery = function (
	selectedText,
	launchByElement
) {
	const helpVisible = LocalStorageUtils.getHelpVisible();
	LocalStorageUtils.persistSearchInput( selectedText );
	if ( helpVisible !== 'true' && launchByElement ) {
		window.newfoldEmbeddedHelp.renderEmbeddedHelp(); // Ensure this is called to update the UI
		toggleHelp( true );
	}
	const isElementVisible = ( element ) => {
		const style = window.getComputedStyle( element );
		return style.display !== 'none' && style.visibility !== 'hidden';
	};

	// Create the Enter key event in advance
	// eslint-disable-next-line no-undef
	const enterKey = new KeyboardEvent( 'keydown', {
		bubbles: true, // Allow the event to bubble up
		cancelable: true, // Allow the event to be cancellable
		key: 'Enter', // Specify which key is pressed
		code: 'Enter', // Physical key code
		keyCode: 13, // Deprecated but included for compatibility
	} );

	const targetElement = document.getElementById( 'nfd-help-center' );
	const maxAttempts = 5;
	let attempts = 0;
	const searchInterval = setInterval( () => {
		attempts++;
		if ( targetElement && isElementVisible( targetElement ) ) {
			const searchInput = document.getElementById( 'search-input-box' );

			searchInput.value = selectedText;
			searchInput.focus();
			searchInput.setSelectionRange(
				searchInput.value.length,
				searchInput.value.length
			);
			// Dispatch the pre-created Enter key event to the input
			searchInput.dispatchEvent( enterKey );
			clearInterval( searchInterval );
		} else if ( attempts >= maxAttempts ) {
			clearInterval( searchInterval );
		}
	}, 500 );
};

/* Detect click event on the calling element and  checking if the clicked element has a specific data attribute name nfdhelpcenterquery */
document.addEventListener( 'click', ( event ) => {
	try {
		if (
			event.target?.dataset?.nfdhelpcenterquery &&
			event.target.dataset.nfdhelpcenterquery.trim() !== ''
		) {
			window.newfoldEmbeddedHelp.launchNFDEmbeddedHelpQuery(
				event.target.dataset.nfdhelpcenterquery,
				true
			);
		}
	} catch ( error ) {
		// eslint-disable-next-line no-console
		console.error( 'Error launching help center via query:', error );
	}
} );
