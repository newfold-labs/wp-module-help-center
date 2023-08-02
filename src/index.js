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
import { Analytics, LocalStorageUtils, CapabilityAPI } from "./utils";
import HelpCenterSidebar from "./components/HelpCenterSidebar";

domReady(() => {
  // Run only once DOM is ready, else this won't work.
  if (window?.nfdHelpCenter?.restUrl) {
    HiiveAnalytics.initialize({
      namespace: "nfd-help-center",
      urls: {
        single: window.nfdHelpCenter.restUrl + "/newfold-data/v1/events",
      },
    });
  }
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
    Analytics.sendEvent("page", "opened");
    return;
  }
  toggleHelp(!helpVisible);
  Analytics.sendEvent("page", "closed");
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

  createRoot(DOM_TARGET).render(
      <Modal
          onClose={() => {
            toggleHelp(false);
            LocalStorageUtils.clear();
          }}
      />
  );
};

newfoldEmbeddedHelp.renderEmbeddedHelp();
