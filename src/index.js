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
    try {
        const parentNode = document.querySelector('#editor');
        if (!parentNode) return;

        const observerConfig = {
            childList: true,
            subtree: true,
        };

        const callback = function(mutationsList, observer) {
            for (const mutation of mutationsList) {
                try {
                    if (mutation.target && mutation.target.querySelector('.editor-post-excerpt') && !mutation.target.querySelector('.editor-post-excerpt .ai-suggestions-button')) {
                        const excerptTextarea = mutation.target.querySelector(".editor-post-excerpt textarea");
                        if (excerptTextarea) {
                            insertAiButton(".editor-post-excerpt textarea", toggleSuggestionGenerator.bind(null, true, ".editor-post-excerpt textarea"));
                            const aiSuggestionsButton = mutation.target.querySelector('.editor-post-excerpt .ai-suggestions-button');
                            if (aiSuggestionsButton) {
                                aiSuggestionsButton.classList.add('ai-suggestions-btn-excerpt');
                            }
                        }
                    }
                } catch (error) {
                    console.error('Error in mutation callback:', error);
                }
            }
        };

        const observer = new MutationObserver(callback);
        observer.observe(parentNode, observerConfig);
    } catch (error) {
        console.error('Error in insertAiButtonForExceprt:', error);
    }
}

const insertAiButtonForOnboarding = () => {
	// Check for onboardingNode
	const onboardingNode = document.getElementById("nfd-onboarding");
	if (onboardingNode) {
		const targetSelector = '[data-target-ai="true"]';
		const onboardingTargetElements = document.querySelectorAll(targetSelector);

		onboardingTargetElements.forEach(targetElement => {
			try {
				// Pass the CSS selector string to the insertAiButton function
				insertAiButton(targetSelector, toggleSuggestionGenerator.bind(null, true, targetSelector));

				const parentElement = targetElement.parentNode;

				// Use querySelector on the parent element
				const aiSuggestionsButton = parentElement.querySelector('.ai-suggestions-button');

				// Add the class to the found .ai-suggestions-button element
				if (aiSuggestionsButton) {
					aiSuggestionsButton.classList.add('ai-suggestions-btn-onboarding');
				}
			} catch (error) {
				console.error('Error in onboardingTargetElements forEach loop:', error);
			}
		});
	}
}

function hasQueryParamWithValue(paramName, paramValue) {
    const searchParams = new URLSearchParams(window.location.search);
    return searchParams.has(paramName) && searchParams.get(paramName) === paramValue;
}

domReady(() => {
	if (hasQueryParamWithValue("enable_suggestions", "1")) {
		setTimeout(() => {
			insertAiButtonForOnboarding();
		}, 1000);
	}
	if (LocalStorageUtils.getFeatureFlag('featureFlag_newfoldContentGenerator') === 'enabled') {
		try {
			// Insert AI button for blog description
			const blogDescriptionField = document.querySelector("#blogdescription");
			if (blogDescriptionField) {
				insertAiButton("#blogdescription", toggleSuggestionGenerator.bind(null, true, '#blogdescription'));
			}

			setTimeout(() => {
				// Call insertAiButtonForExceprt after the first set of operations
				insertAiButtonForExceprt();
			}, 1000);

		} catch (error) {
			console.error('Error in domReady callback:', error);
		}
	}
});


/* The method added to the window object can be used to open the help center pop and enter the text clicked */
if (
	LocalStorageUtils.getFeatureFlag(
		'featureFlag_newfoldLaunchHelpCenter'
	) === 'enabled'
) {
	window.newfoldEmbeddedHelp.launchNFDEmbeddedHelpQuery = function (
		selectedText,
		launchByElement
	) {
		const helpVisible = LocalStorageUtils.getHelpVisible();
		if ( helpVisible !== 'true' && launchByElement ) toggleHelp( true );

		const isElementVisible = ( element ) => {
			const style = window.getComputedStyle( element );
			return style.display !== 'none' && style.visibility !== 'hidden';
		};

		const targetElement = document.getElementById( 'nfd-help-center' );
		const maxAttempts = 5;
		let attempts = 0;
		const searchInterval = setInterval( () => {
			attempts++;
			if ( targetElement && isElementVisible( targetElement ) ) {
				const searchInput =
					document.getElementById( 'search-input-box' );
				setTimeout( () => {
					searchInput.value = selectedText;
					searchInput.focus();
				}, 500 );
				clearInterval( searchInterval );
			} else if ( attempts >= maxAttempts ) {
				clearInterval( searchInterval );
			}
		}, 300 );
	};

	function getElementsInnerText( element ) {
		// If the element itself has text, return it
		if ( element.innerText.trim() ) {
			return element.innerText;
		}

		// to check if the child element has text
		for ( const child of element.childNodes ) {
			// eslint-disable-next-line no-undef
			if ( child.nodeType === Node.ELEMENT_NODE ) {
				const childText = getElementsInnerText( child );
				if ( childText ) {
					return childText;
				}
			}
		}

		// If no text was found in the element or its children, return null
		return null;
	}

	/* Detect click event on the calling element and  checking if the clicked element has a specific class name (look-up-help in the case below) and Extract the inner text of the clicked element */
	document.addEventListener( 'click', ( event ) => {
		const clickedElement = event.target.closest(
			'[data-openNfdHelpCenter]'
		);

		if ( clickedElement ) {
			const selectedText = getElementsInnerText( clickedElement );
			if ( selectedText ) {
				window.newfoldEmbeddedHelp.launchNFDEmbeddedHelpQuery(
					selectedText,
					true
				);
			}
		}
	} );
}
