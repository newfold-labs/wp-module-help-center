import { createRoot, render } from '@wordpress/element';

import { subscribe } from '@wordpress/data';
//
import domReady from '@wordpress/dom-ready';
import { HiiveAnalytics } from '@newfold-labs/js-utility-ui-analytics';
//
import Modal from './components/Modal';
import { ReactComponent as Help } from './icons/help-plugin-sidebar-icon.svg';
import { Analytics, LocalStorageUtils, OnboardingAPIs } from './utils';
import '../styles.scss';

const OpenHelpCenterForNovice = async () => {
	const queryParams = new URL( document.location ).searchParams;
	const referrer = queryParams.get( 'referrer' );
	if ( ! referrer ) {
		return;
	}
	if ( referrer.toString() === 'nfd-onboarding' ) {
		// Check for the user's wordpress capability
		const flowData = await OnboardingAPIs.getFlowData();
		if ( flowData.data.wpComfortLevel === '1' ) {
			toggleHelp( true );
		}
	}
};

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
	OpenHelpCenterForNovice();
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
							LocalStorageUtils.clear();
						} }
					/>
				);
			} else if ( 'undefined' !== render ) {
				render(
					<Modal
						onClose={ () => {
							toggleHelp( false );
							LocalStorageUtils.clear();
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

/* The method added to the window object can be used to open the help center pop and enter the text clicked */
if (LocalStorageUtils.getFeatureFlag('featureFlag_newfoldLaunchHelpCenter') === 'enabled') {
	window.newfoldEmbeddedHelp.launchNFDEmbeddedHelpQuery = function (
		selectedText,
		launchByElement
	) {
		const helpVisible = LocalStorageUtils.getHelpVisible();
		if (helpVisible !== 'true' && launchByElement) toggleHelp(true);

		const isElementVisible = (element) => {
			const style = window.getComputedStyle(element);
			return style.display !== 'none' && style.visibility !== 'hidden';
		};

		const targetElement = document.getElementById('nfd-help-center');
		const maxAttempts = 5;
		let attempts = 0;
		const searchInterval = setInterval(() => {
			attempts++;
			if (targetElement && isElementVisible(targetElement)) {
				const searchInput = document.getElementById('search-input-box');
				setTimeout(() => {
					searchInput.value = selectedText;
					searchInput.focus();
				}, 500);
				clearInterval(searchInterval);
			} else if (attempts >= maxAttempts) {
				clearInterval(searchInterval);
			}
		}, 300);
	};




function getElementsInnerText(element) {
    // If the element itself has text, return it
    if (element.innerText.trim()) {
        return element.innerText;
    }

    // to check if the child element has text
    for (let child of element.childNodes) {
        if (child.nodeType === Node.ELEMENT_NODE) {
            let childText = getElementsInnerText(child);
            if (childText) {
                return childText;
            }
        }
    }

    // If no text was found in the element or its children, return null
    return null;
}

	/* Detect click event on the calling element and  checking if the clicked element has a specific class name (look-up-help in the case below) and Extract the inner text of the clicked element */
	document.addEventListener('click', function (event) {
		const clickedElement = event.target;
		if (clickedElement.hasAttribute('data-openNfdHelpCenter')) {
			let selectedText = getElementsInnerText(clickedElement);
			if (selectedText) {
				window.newfoldEmbeddedHelp.launchNFDEmbeddedHelpQuery(
					selectedText,
					true
				);
			}
		}
	});
}
