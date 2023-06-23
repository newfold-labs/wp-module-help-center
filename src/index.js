import { PluginSidebar } from "@wordpress/edit-post";
import React, { render } from "@wordpress/element";
import { registerPlugin } from "@wordpress/plugins";
import { HiiveAnalytics } from "@newfold-labs/js-utility-ui-analytics";
import { __ } from "@wordpress/i18n";
import "../styles.scss";
import HelpCenter from "./components/HelpCenter";
import Modal from "./components/Modal";
import { ReactComponent as Help } from "./icons/help-plugin-sidebar-icon.svg";
import { Analytics, LocalStorageUtils } from "./utils";

if (window?.nfdHelpCenter?.restUrl) {
  HiiveAnalytics.initialize({
    urls: {
      single: window.nfdHelpCenter.restUrl + "/newfold-data/v1/events",
    },
  });
}

const wpContentContainer = document.getElementById("wpcontent");

export const toggleHelp = (visible) => {
  wpContentContainer.classList.toggle("wpcontent-container", visible);
  let nfdHelpContainer = document.getElementById("nfd-help-center");
  nfdHelpContainer.classList.toggle("help-container", visible);
  LocalStorageUtils.updateHelpVisible(visible);
};

window.newfoldEmbeddedHelp = {};
window.newfoldEmbeddedHelp.toggleNFDLaunchedEmbeddedHelp = () => {
  const helpVisible = LocalStorageUtils.getHelpVisible();
  if (Object.is(helpVisible, undefined)) {
    toggleHelp(true);
    Analytics.sendEvent("page", "opened");
    return;
  }
  toggleHelp(!helpVisible);
  Analytics.sendEvent("page", "closed");
};

window.newfoldEmbeddedHelp.toggleNFDUnlaunchedEmbeddedHelp =
  function toggleNFDUnlaunchedEmbeddedHelp() {
    let helpContainer = document.getElementById("nfd-help-center");
    wpContentContainer.removeChild(helpContainer);
    newfoldEmbeddedHelp.renderEmbeddedHelp();
  };

//For rendering embedded help in Add, edit and View Pages
const HelpCenterPluginSidebar = () => {
  return (
    <PluginSidebar
      name="nfd-help-sidebar"
      className="nfd-plugin-sidebar"
      title="Help Center"
      icon={<Help />}
    >
      <HelpCenter />
    </PluginSidebar>
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

  render(
    <Modal
      onClose={() => {
        toggleHelp(false);
        LocalStorageUtils.clear();
      }}
    />,
    DOM_TARGET
  );
};

newfoldEmbeddedHelp.renderEmbeddedHelp();
