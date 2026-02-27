// eslint-disable-next-line import/no-extraneous-dependencies
import { createRoot, render } from '@wordpress/element';
import 'regenerator-runtime/runtime';

import { default as wpApiFetch } from '@wordpress/api-fetch';
import { subscribe, default as wpData } from '@wordpress/data';
//
import { HiiveAnalytics } from '@newfold/js-utility-ui-analytics';
import domReady from '@wordpress/dom-ready';
//
import { Provider } from 'react-redux';
import { store } from '../store';
import { helpcenterActions } from '../store/helpcenterSlice';
import FloatingIcon from './components/FloatingIcon';
import Modal from './components/Modal';
import { ReactComponent as Help } from './icons/help-plugin-sidebar-icon.svg';
import './styles/styles.scss';
import {
	Analytics,
	formatPostContent,
	LocalStorageUtils,
	MultiSearchAPI,
} from './utils';

domReady(() => {
	// Run only once DOM is ready, else this won't work.
	if (window?.nfdHelpCenter?.restUrl) {
		HiiveAnalytics.initialize({
			namespace: 'wonder_help',
			urls: {
				single:
					window.nfdHelpCenter.restUrl + '/newfold-data/v1/events',
			},
			dependencies: {
				wpData,
				wpApiFetch,
			},
		});
	}
});

const wpContentContainer = document.getElementById('wpcontent');

export const toggleHelp = (visible) => {
	wpContentContainer.classList.toggle('wpcontent-container', visible);
	const nfdHelpContainer = document.getElementById('nfd-help-center');
	nfdHelpContainer.classList.toggle('help-container', visible);
	LocalStorageUtils.updateHelpVisible(visible);
	window.dispatchEvent(new Event('storage'));
	LocalStorageUtils.clearSearchInput();
	if (!visible) {
		LocalStorageUtils.clearSearchInput();
	}
};

const toggleHelpViaLocalStorage = () => {
	const helpVisible = LocalStorageUtils.getHelpVisible();
	if (Object.is(helpVisible, undefined)) {
		toggleHelp(true);
		Analytics.sendEvent('help_sidebar_opened', {
			page: window.location.href.toString(),
		});
		return;
	}
	if (!helpVisible) {
		Analytics.sendEvent('help_sidebar_opened', {
			page: window.location.href.toString(),
		});
	}
	toggleHelp(!helpVisible);
};

window.newfoldEmbeddedHelp = {
	toggleNFDLaunchedEmbeddedHelp: () => {
		toggleHelpViaLocalStorage();
	},
	renderEmbeddedHelp: () => {
		const helpContainer = document.createElement('div');
		helpContainer.id = 'nfd-help-center';
		helpContainer.style.display = 'none';
		wpContentContainer.appendChild(helpContainer);

		// Create separate container for FloatingIcon
		const floatingIconContainer = document.createElement('div');
		floatingIconContainer.id = 'nfd-hc-floating-icon-wrapper';
		wpContentContainer.appendChild(floatingIconContainer);

		const DOM_TARGET = document.getElementById('nfd-help-center');
		const FLOATING_ICON_TARGET = document.getElementById(
			'nfd-hc-floating-icon-wrapper'
		);

		const { hasLaunchedFromTooltip } = store.getState().helpcenter;

		if (null !== DOM_TARGET) {
			if ('undefined' !== createRoot) {
				// WP 6.2+ only
				createRoot(DOM_TARGET).render(
					<Provider store={store}>
						<Modal
							onClose={() => {
								LocalStorageUtils.clear();
								store.dispatch(helpcenterActions.resetState());
								toggleHelp(false);
							}}
						/>
					</Provider>
				);

				if (hasLaunchedFromTooltip) {
					createRoot(FLOATING_ICON_TARGET).render(
						<Provider store={store}>
							<FloatingIcon />
						</Provider>
					);
				}
			} else if ('undefined' !== render) {
				render(
					<Provider store={store}>
						<Modal
							onClose={() => {
								LocalStorageUtils.clear();
								store.dispatch(helpcenterActions.resetState());
								toggleHelp(false);
							}}
						/>
					</Provider>,
					DOM_TARGET
				);

				// Render FloatingIcon in separate container
				if (hasLaunchedFromTooltip) {
					render(
						<Provider store={store}>
							<FloatingIcon />
						</Provider>,
						FLOATING_ICON_TARGET
					);
				}
			}
		}
	},
};

//For rendering embedded help in Add, edit and View Pages
/* Using the subscribe from the store to keep the UI persistent */
const unsubscribe = subscribe(() => {
	const wrapper = document.getElementById('nfd-help-menu-button-wrapper');

	if (wrapper) {
		unsubscribe(); // Unsubscribe from the state changes
		return;
	}

	domReady(() => {
		const editorToolbarSettings = document.querySelector(
			'.edit-post-header__settings'
		);

		if (!editorToolbarSettings) {
			return;
		}

		// Create wrapper to fill with the button
		const buttonWrapper = document.createElement('div');

		buttonWrapper.id = 'nfd-help-menu-button-wrapper';
		buttonWrapper.classList.add('nfd-help-menu-button-wrapper');
		const moreMenuDropdown = editorToolbarSettings.querySelector(
			'.components-dropdown-menu.interface-more-menu-dropdown'
		);

		if (moreMenuDropdown) {
			editorToolbarSettings.insertBefore(buttonWrapper, moreMenuDropdown);
		} else {
			editorToolbarSettings.appendChild(buttonWrapper);
		}

		const helpMenuButton = (
			<button
				className="components-button has-icon"
				onClick={() => {
					window.newfoldEmbeddedHelp.toggleNFDLaunchedEmbeddedHelp();
				}}
			>
				<Help />
			</button>
		);

		render(
			helpMenuButton,
			document.getElementById('nfd-help-menu-button-wrapper')
		);
	});
});

window.newfoldEmbeddedHelp.renderEmbeddedHelp();

/* The method added to the window object can be used to open the help center pop and enter the text/query clicked */

window.newfoldEmbeddedHelp.launchNFDEmbeddedHelpQuery = function (
	selectedText,
	launchByElement
) {
	const helpVisible = LocalStorageUtils.getHelpVisible();
	LocalStorageUtils.persistSearchInput(selectedText);
	if (helpVisible !== 'true' && launchByElement) {
		window.newfoldEmbeddedHelp.renderEmbeddedHelp(); // Ensure this is called to update the UI
		toggleHelp(true);
	}
	const isElementVisible = (element) => {
		const style = window.getComputedStyle(element);
		return style.display !== 'none' && style.visibility !== 'hidden';
	};

	// Create the Enter key event in advance
	// eslint-disable-next-line no-undef
	const enterKey = new KeyboardEvent('keydown', {
		bubbles: true, // Allow the event to bubble up
		cancelable: true, // Allow the event to be cancellable
		key: 'Enter', // Specify which key is pressed
		code: 'Enter', // Physical key code
		keyCode: 13, // Deprecated but included for compatibility
	});

	const targetElement = document.getElementById('nfd-help-center');
	const maxAttempts = 5;
	let attempts = 0;
	const searchInterval = setInterval(() => {
		attempts++;
		if (targetElement && isElementVisible(targetElement)) {
			const searchInput = document.getElementById('search-input-box');

			searchInput.value = selectedText;
			searchInput.focus();
			searchInput.setSelectionRange(
				searchInput.value.length,
				searchInput.value.length
			);
			// Dispatch the pre-created Enter key event to the input
			searchInput.dispatchEvent(enterKey);
			clearInterval(searchInterval);
		} else if (attempts >= maxAttempts) {
			clearInterval(searchInterval);
		}
	}, 500);
};

/* Detect click event on the calling element and  checking if the clicked element has a specific class name nfd-help-center-tip */
document.addEventListener('click', async (event) => {
	try {
		if (event.target?.classList?.contains('nfd-help-center-tip')) {
			if (!LocalStorageUtils.getHelpVisible()) {
				document
					.getElementById('wp-admin-bar-help-center')
					.querySelector('.ab-item')
					.click();
			}
			store.dispatch(helpcenterActions.setIsTooltipLoading());
			const postId = event.target.dataset.postId;

			const results =
				await MultiSearchAPI.fetchTooltipSearchResults(postId);

			if (!results?.content) {
				store.dispatch(helpcenterActions.updateIsTooltipLoading());
				store.dispatch(helpcenterActions.setNoResult());
				return;
			}

			const result = {
				resultContent: results.content.rendered,
				postId,
				searchInput: results.title.rendered,
				feedbackSubmitted: null,
			};
			LocalStorageUtils.persistResult(
				result.resultContent,
				postId,
				result.searchInput,
				result.feedbackSubmitted,
				true
			);
			LocalStorageUtils.persistSearchInput(result.searchInput);
			store.dispatch(helpcenterActions.updateIsTooltipLoading());
			store.dispatch(helpcenterActions.updateResultContent(result));
		}
	} catch (error) {
		// eslint-disable-next-line no-console
		console.error('Error launching help center via query:', error);
	}
});
