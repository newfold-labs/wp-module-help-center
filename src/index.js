import React, { createRoot, useState, render } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
//
import { PluginSidebar } from "@wordpress/edit-post";
import { registerPlugin } from "@wordpress/plugins";
import { subscribe } from '@wordpress/data';
//
import domReady from "@wordpress/dom-ready";
import { HiiveAnalytics } from "@newfold-labs/js-utility-ui-analytics";
//
import "../styles.scss";
import Modal from "./components/Modal";
import { ReactComponent as Help } from "./icons/help-plugin-sidebar-icon.svg";
import { Analytics, LocalStorageUtils, CapabilityAPI, OnboardingAPIs } from "./utils";
import HelpCenterSidebar from "./components/HelpCenterSidebar";

const OpenHelpCenterForNovice = async () => {
  const queryParams = (new URL(document.location)).searchParams;
  const referrer = queryParams.get('referrer');
  if (!referrer) {
    return;
  }
  if (referrer.toString() === 'nfd-onboarding') {
    // Check for the user's wordpress capability
    const flowData = await OnboardingAPIs.getFlowData();
    if (flowData.data.wpComfortLevel === '1') {
      toggleHelp(true);
    }
  }
}

domReady(() => {
  // Run only once DOM is ready, else this won't work.
  if (window?.nfdHelpCenter?.restUrl) {
    HiiveAnalytics.initialize({
      namespace: "wonder_help",
      urls: {
        single: window.nfdHelpCenter.restUrl + "/newfold-data/v1/events",
      },
    });
  }
  OpenHelpCenterForNovice();
});

const wpContentContainer = document.getElementById("wpcontent");

export const toggleHelp = (visible) => {
  wpContentContainer.classList.toggle("wpcontent-container", visible);
  let nfdHelpContainer = document.getElementById("nfd-help-center");
  nfdHelpContainer.classList.toggle("help-container", visible);
  LocalStorageUtils.updateHelpVisible(visible);
  window.dispatchEvent(new Event("storage"));
};

const toggleHelpViaLocalStorage = () => {
  const helpVisible = LocalStorageUtils.getHelpVisible();
  if (Object.is(helpVisible, undefined)) {
    toggleHelp(true);
    Analytics.sendEvent("help_sidebar_opened", {
      page: window.location.href.toString(),
    });
    return;
  }
  if (!helpVisible) {
    Analytics.sendEvent("help_sidebar_opened", {
      page: window.location.href.toString(),
    });
  }
  toggleHelp(!helpVisible);
};

window.newfoldEmbeddedHelp = {};
window.newfoldEmbeddedHelp.toggleNFDLaunchedEmbeddedHelp = () => {
  toggleHelpViaLocalStorage();
};

//For rendering embedded help in Add, edit and View Pages
/* const HelpCenterPluginSidebar = () => {
  const [helpEnabled, setHelpEnabled] = useState(false);
  CapabilityAPI.getHelpCenterCapability().then((response) => {
    setHelpEnabled(response);
  });

  return (
    <>
      <PluginSidebar
        name="nfd-help-sidebar"
        className="nfd-plugin-sidebar"
        title="Help Center"
        icon={<Help />}
        isPinnable={helpEnabled}
      >
        <HelpCenterSidebar />
      </PluginSidebar>
    </>
  );
};

registerPlugin("nfd-help-panel", {
  render: HelpCenterPluginSidebar,
}); */

//For rendering embedded help in Admin Pages
window.newfoldEmbeddedHelp.renderEmbeddedHelp = function renderEmbeddedHelp() {
  let helpContainer = document.createElement("div");
  helpContainer.id = "nfd-help-center";
  helpContainer.style.display = "none";
  wpContentContainer.appendChild(helpContainer);
  const DOM_TARGET = document.getElementById("nfd-help-center");

  if (null !== DOM_TARGET) {
    if ("undefined" !== createRoot) {
      // WP 6.2+ only
      createRoot(DOM_TARGET).render(
        <Modal
          onClose={() => {
            toggleHelp(false);
            LocalStorageUtils.clear();
          }}
        />
      );
    } else if ("undefined" !== render) {
      render(
        <Modal
          onClose={() => {
            toggleHelp(false);
            LocalStorageUtils.clear();
          }}
        />,
        DOM_TARGET
      );
    }
  }
};

newfoldEmbeddedHelp.renderEmbeddedHelp();

/* The method added to the window object can be used to open the help center pop and enter the text clicked */
window.newfoldEmbeddedHelp.launchNFDEmbeddedHelpQuery = function (selectedText, launchByElement) {
  const helpVisible = LocalStorageUtils.getHelpVisible();
  if (helpVisible !== "true" && launchByElement)
    toggleHelp(true);

  const isElementVisible = (element) => {
    const style = window.getComputedStyle(element);
    return style.display !== 'none' && style.visibility !== 'hidden';
  }

  const targetElement = document.getElementById('nfd-help-center');
  const maxAttempts = 5;
  let attempts = 0;
  const searchInterval = setInterval(() => {
    attempts++;
    console.log("🚀 ~ file: index.js:159 ~ searchInterval ~ attempts:", attempts);
    if (targetElement && isElementVisible(targetElement)) {
      const searchInput = document.getElementById('search-input-box');
      searchInput.value = selectedText;
      searchInput.focus();
      clearInterval(searchInterval);
    } else if (attempts >= maxAttempts) {
      clearInterval(searchInterval);
    }
  }, 300);
}


  /* Detect click event on the calling element and  checking if the clicked element has a specific class name (look-up-help in the case below) and Extract the inner text of the clicked element */
  document.addEventListener('click', function (event) {
    const clickedElement = event.target;    
    if (clickedElement.classList.contains('look-up-help')) {
      const selectedText = clickedElement.innerText;
      if(selectedText){
        window.newfoldEmbeddedHelp.launchNFDEmbeddedHelpQuery(selectedText, true);
      }
    }
  });

  /* Using the subscribe from the store to keep the UI persistent */
  const unsubscribe = subscribe(() => {
    const wrapper = document.getElementById('help-menu-button-wrapper');

    if (wrapper) {
      unsubscribe(); // Unsubscribe from the state changes
      return;
    }

    domReady(() => {
      const editorToolbarSettings = document.querySelector('.edit-post-header__settings');

      if (!editorToolbarSettings) {
        return;
      }

      // Create wrapper to fill with the button
      const buttonWrapper = document.createElement('div');

      buttonWrapper.id = 'help-menu-button-wrapper';
      buttonWrapper.classList.add('help-menu-button-wrapper');
      const moreMenuDropdown = editorToolbarSettings.querySelector('.components-dropdown-menu.interface-more-menu-dropdown');

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

      render(helpMenuButton, document.getElementById('help-menu-button-wrapper'));
    });
  });
