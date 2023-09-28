import { createRoot, render } from '@wordpress/element';

import { subscribe } from '@wordpress/data';
//
import domReady from '@wordpress/dom-ready';
import { HiiveAnalytics } from '@newfold-labs/js-utility-ui-analytics';
//
import Modal from './components/Modal';
import HelpCenter from './components/HelpCenter';
import SuggestionsGenerator from './components/SuggestionsGenerator'
import { ReactComponent as HelpIcon } from './icons/help.svg';
import { ReactComponent as AiIcon } from './icons/ai-icon.svg';
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

export const toggleSuggestionGenerator = ( visible ) => {
	wpContentContainer.classList.toggle( 'wpcontent-container', visible );
	const nfdSuggestionContainer = document.getElementById( 'nfd-suggestion-center' );
	nfdSuggestionContainer.classList.toggle( 'help-container', visible );
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

const handleClose = () => {
	toggleHelp( false );
	LocalStorageUtils.clear();
}

const createSidebarContent = (containerId, contentComponent, iconComponent, sidebarHeading) => {
	const container = document.getElementById(containerId);
	if (!container) return;
  
	const sidebarProps = {
	  onClose: handleClose,
	  contentComponent: contentComponent,
	  iconComponent: iconComponent,
	  sidebarHeading: sidebarHeading,
	  sidebarHeadingId: `wp-module-${containerId}`,
	};
  
	if ('undefined' !== createRoot) {
	  createRoot(container).render(<Modal {...modalProps} />);
	} else if ('undefined' !== render) {
	  render(<Modal {...sidebarProps} />, container);
	}
  };

window.newfoldEmbeddedHelp = {
	toggleNFDLaunchedEmbeddedHelp: () => {
		toggleHelpViaLocalStorage();
	},
	renderEmbeddedHelp: () => {
		createSidebarContent('nfd-help-center', (props) => <HelpCenter {...props} />, <HelpIcon />, 'Help Center');
	},
	renderSuggestionsSidebar: () => {
		createSidebarContent('nfd-suggestion-center', (props) => <SuggestionsGenerator {...props} />, <AiIcon />, 'Suggestions Generator');
	}
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
		console.log("🚀 ~ file: index.js:150 ~ domReady ~ unsubscribe:");
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

window.newfoldEmbeddedHelp.renderSuggestionsSidebar();
window.newfoldEmbeddedHelp.renderEmbeddedHelp();

domReady( () => {
	// Run only once DOM is ready, else this won't work.

	var taglineInputField = document.querySelector("#blogdescription");
	var triggerButton = document.createElement("button");
		triggerButton.textContent = "AI";

		// Attach a click event listener to the button
		triggerButton.addEventListener("click", function (event) {
			toggleSuggestionGenerator(true);
			//window.newfoldEmbeddedHelp.renderSuggestionsSidebar();
			event.preventDefault();
		});


	if (taglineInputField) {
		taglineInputField.parentNode.insertBefore(triggerButton, taglineInputField.nextSibling);
	} 
} );