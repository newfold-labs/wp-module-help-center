import { createRoot, render } from '@wordpress/element';

import { subscribe, select  } from '@wordpress/data';
//
import domReady from '@wordpress/dom-ready';
import { registerPlugin } from '@wordpress/plugins';
import {PluginDocumentSettingPanel} from '@wordpress/edit-post'
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

/* const MyExcerptButtonComponent = () => (
    <PluginDocumentSettingPanel 
        name="my-custom-excerpt-button"
        title="Hellooooo" // This will make it visually look like it's part of the Excerpt
        className="my-custom-excerpt-panel"
    >
        <h1>My Excerpt Button</h1>
    </PluginDocumentSettingPanel>
);

registerPlugin( 'my-excerpt-button', { render: MyExcerptButtonComponent } );



 */
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
						onClose={ handleClose }
						contentComponent={(props) => <HelpCenter {...props} />}
        				iconComponent={<HelpIcon />}
						sidebarHeading={`Help Center`}
						sidebarHeadingId={`wp-module-help-center`}
					/>
				);
			} else if ( 'undefined' !== render ) {
				render(
					<Modal
						onClose={ handleClose }
						contentComponent={(props) => <HelpCenter {...props} />}
        				iconComponent={<HelpIcon />}
						sidebarHeading={`Help Center`}
						sidebarHeadingId={`wp-module-help-center`}
					/>,
					DOM_TARGET
				);
			}
		}
	},
	renderSuggestionsSidebar: () => {
		const suggestionContainer = document.createElement( 'div' );
		suggestionContainer.id = 'nfd-suggestion-center';
		suggestionContainer.style.display = 'none';
		wpContentContainer.appendChild( suggestionContainer );
		const DOM_TARGET = document.getElementById( 'nfd-suggestion-center' );

		if ( null !== DOM_TARGET ) {
			if ( 'undefined' !== createRoot ) {
				// WP 6.2+ only
				createRoot( DOM_TARGET ).render(
					<Modal
						onClose={ handleClose }
						contentComponent={(props) => <SuggestionsGenerator {...props} />}
        				iconComponent={<AiIcon />}
						sidebarHeading={`Content Generator`}
						sidebarHeadingId={`wp-module-content-generator`}
					/>
				);
			} else if ( 'undefined' !== render ) {
				render(
					<Modal
						onClose={ handleClose }
						contentComponent={(props) => <SuggestionsGenerator {...props} />}
        				iconComponent={<AiIcon />}
						sidebarHeading={`Content Generator`}
						sidebarHeadingId={`wp-module-content-generator`}
					/>,
					DOM_TARGET
				);
			}
		}
	},
};

//For rendering embedded help in Add, edit and View Pages
/* Using the subscribe from the store to keep the UI persistent */
const { Button } = wp.components;
const unsubscribe = subscribe( () => {
	
	console.log("🚀 ~ file: index.js:180 ~ unsubscribe ~ change:", );
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

		insertCustomButton();
		
		render(
			helpMenuButton,
			document.getElementById( 'nfd-help-menu-button-wrapper' )
		);

	} );
} );

window.newfoldEmbeddedHelp.renderSuggestionsSidebar();
window.newfoldEmbeddedHelp.renderEmbeddedHelp();

const insertCustomButton = () => {
    const excerptPanel = document.querySelector('.editor-post-excerpt');
    if (excerptPanel && !document.querySelector('.my-custom-button')) { // Check to avoid duplicate insertions
        const buttonContainer = document.createElement('div');
        excerptPanel.appendChild(buttonContainer);
        wp.element.render(<Button className="my-custom-button">My Custom Button</Button>, buttonContainer);
    }
};


domReady(() => {
	// Run only once DOM is ready, else this won't work.

	/* var taglineInputField = document.querySelector("#blogdescription");
	taglineInputField.style.paddingRight = "30px";
	var triggerButton = document.createElement("div");
	triggerButton.classList.add("ai-suggestions-button");
	triggerButton.textContent = "AI";

	// Attach a click event listener to the button
	triggerButton.addEventListener("click", function (event) {
		toggleSuggestionGenerator(true);
		//window.newfoldEmbeddedHelp.renderSuggestionsSidebar();
		event.preventDefault();
	});
	
	if (taglineInputField) {
		taglineInputField.parentNode.insertBefore(triggerButton, taglineInputField.nextSibling);
	}	 */
	
	 setTimeout(() => {
		insertCustomButton(); 
	}, 500); 
});