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

export const toggleSuggestionGenerator = (visible, targetSelector, event) => {
    const nfdSuggestionContainer = document.getElementById('nfd-suggestion-center');
    
    // If the nfd-suggestion-center doesn't exist, call the renderSuggestionsSidebar function
    if (!nfdSuggestionContainer) {
        window.newfoldEmbeddedHelp.renderSuggestionsSidebar(targetSelector);
    }

    wpContentContainer.classList.toggle('wpcontent-container', visible);

    // Make sure to re-query the nfdSuggestionContainer in case it was just added to the DOM
    const updatedNfdSuggestionContainer = document.getElementById('nfd-suggestion-center');
    if (updatedNfdSuggestionContainer) {
        updatedNfdSuggestionContainer.classList.toggle('help-container', visible);
    }
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
	toggleSuggestionGenerator(false);
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
	renderSuggestionsSidebar: (targetSelector) => {
		console.log("target selector", targetSelector);
		const suggestionContainer = document.createElement( 'div' );
		suggestionContainer.id = 'nfd-suggestion-center';
		suggestionContainer.style.display = 'block';
		wpContentContainer.appendChild( suggestionContainer );
		const DOM_TARGET = document.getElementById( 'nfd-suggestion-center' );

		if ( null !== DOM_TARGET ) {
			if ( 'undefined' !== createRoot ) {
				// WP 6.2+ only
				createRoot( DOM_TARGET ).render(
					<Modal
						onClose={ handleClose }
						contentComponent={(props) => <SuggestionsGenerator targetSelector={targetSelector} {...props} />}
        				iconComponent={<AiIcon />}
						sidebarHeading={`Content Generator`}
						sidebarHeadingId={`wp-module-content-generator`}
					/>
				);
			} else if ( 'undefined' !== render ) {
				render(
					<Modal
						onClose={ handleClose }
						contentComponent={(props) => <SuggestionsGenerator targetSelector={targetSelector} {...props} />}
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

		
		render(
			helpMenuButton,
			document.getElementById( 'nfd-help-menu-button-wrapper' )
		);

	} );
} );

// window.newfoldEmbeddedHelp.renderSuggestionsSidebar();
window.newfoldEmbeddedHelp.renderEmbeddedHelp();

function insertAiButton(targetSelector, onClick) {
    const targetField = document.querySelector(targetSelector);
    if (targetField && !targetField.parentNode.querySelector('.ai-suggestions-button')) {
        var triggerButton = document.createElement("div");
        triggerButton.classList.add("ai-suggestions-button");
        triggerButton.textContent = "AI";
        triggerButton.addEventListener("click", function (event) {
            onClick(event, targetSelector);  // Pass targetSelector to the onClick handler
            event.preventDefault();
        });
        targetField.parentNode.insertBefore(triggerButton, targetField.nextSibling);
    }
}

const insertAiButtonForExceprt = () => {
    const parentNode = document.querySelector('#editor');
    if (!parentNode) return;
    const observerConfig = {
        childList: true,
        subtree: true,
    };
    const callback = function(mutationsList, observer) {
        for (const mutation of mutationsList) {
            if (document.querySelector('.editor-post-excerpt') && !document.querySelector('.editor-post-excerpt .my-custom-button')) {
                insertAiButton(".editor-post-excerpt", toggleSuggestionGenerator.bind(null, true, ".editor-post-excerpt textarea"));
            }
        }
    };
    const observer = new MutationObserver(callback);
    observer.observe(parentNode, observerConfig);
}

domReady(() => {
	insertAiButton("#blogdescription", toggleSuggestionGenerator.bind(null, true, '#blogdescription'));
    setTimeout(() => {
        insertAiButtonForExceprt();
    }, 1000);

    const onboardingNode = document.getElementById("nfd-onboarding");
    if (onboardingNode) {
		const onboardingTargetElement = '.basic-info-form__left .nfd-input:nth-child(2) textarea.nfd-input__field';
        setTimeout(() => {
            insertAiButton(onboardingTargetElement, toggleSuggestionGenerator.bind(null, true, onboardingTargetElement));
        }, 1000);
    }
});

/* domReady(() => {
	// Run only once DOM is ready, else this won't work.

	setTimeout(() => {
		insertAiButtonForExceprt();
	}, 1000);

var taglineInputField = document.querySelector("#blogdescription");
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
	}	
 

	const onboardingNode = document.getElementById("nfd-onboarding");
	// debugger;
	if (onboardingNode) {
		setTimeout(() => {
			const elementNode = document.querySelector('.basic-info-form__left textarea.nfd-input__field');
		if (elementNode) {
			var triggerButton = document.createElement("div");
			triggerButton.classList.add("ai-suggestions-button");
			triggerButton.textContent = "AI";

			// Attach a click event listener to the button
			triggerButton.addEventListener("click", function (event) {
				toggleSuggestionGenerator(true);
				//window.newfoldEmbeddedHelp.renderSuggestionsSidebar();
				event.preventDefault();
			});

			elementNode.parentNode.insertBefore(triggerButton, elementNode.nextSibling);
		}
		}, 1000);
	}
}); */