import React, { createRoot, useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
//
import { PluginSidebar } from "@wordpress/edit-post";
import { registerPlugin } from "@wordpress/plugins";
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
const HelpCenterPluginSidebar = () => {
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
});

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


  /* Detect click event on the calling element and  checking if the clicked element has a specific class name and Extract the inner text of the clicked element */
  document.addEventListener('click', function (event) {
    const clickedElement = event.target;    
    if (clickedElement.classList.contains('look-up-help')) {
      const selectedText = clickedElement.innerText;
      if(selectedText){
        window.newfoldEmbeddedHelp.launchNFDEmbeddedHelpQuery(selectedText, true);
      }
    }
  });

/* Trigger via Localstorage */

function dispatchHelpCenterQueryChangeEvent(oldValue, newValue) {
  const customEvent = new CustomEvent('helpCenterQueryChange', {
      detail: {
          oldValue: oldValue,
          newValue: newValue
      }
  });
  window.dispatchEvent(customEvent);
}

// Function to handle storage events
window.addEventListener('storage', (event) => {
  if (event.key === 'helpCenterQuery') {
    const newValue = event.newValue;
    const oldValue = event.oldValue;

    console.log(`helpCenterQuery changed from "${oldValue}" to "${newValue}" in another tab.`);
    
    if (oldValue !== newValue) {
      window.newfoldEmbeddedHelp.launchNFDEmbeddedHelpQuery(newValue, true);
    }

    // Dispatch the custom event for handling the change in the same tab
    dispatchHelpCenterQueryChangeEvent(oldValue, newValue);
  }
});

// Listen for the custom event and access old and new values
window.addEventListener('helpCenterQueryChange', (event) => {
  const { oldValue, newValue } = event.detail;
  console.log(`helpCenterQuery changed from "${oldValue}" to "${newValue}" in the same tab.`);

  // Compare old and new values
  if (oldValue !== newValue) {
    window.newfoldEmbeddedHelp.launchNFDEmbeddedHelpQuery(newValue, true);
  }
});

window.newfoldEmbeddedHelp.launchNFDEmbeddedHelpViaLS  = function (dataInput) {
  // Get the old value before updating
  const oldValue = localStorage.getItem('helpCenterQuery');
  const currentDateInMilliseconds = new Date().getTime();
  const newData = dataInput + currentDateInMilliseconds;
  localStorage.setItem('helpCenterQuery', newData);

  // Dispatch the custom event to notify changes along with the old and new values
  dispatchHelpCenterQueryChangeEvent(oldValue, newData);

  console.log(`Data "${newData}" saved to localStorage in the same tab.`);
}

