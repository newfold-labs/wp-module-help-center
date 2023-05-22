import { PluginSidebar } from "@wordpress/edit-post";
import React, { render } from "@wordpress/element";
import { registerPlugin } from "@wordpress/plugins";
import "../styles.scss";
import HelpCenter from "./components/HelpCenter";
import Modal from "./components/Modal";
import { ReactComponent as Help } from "./icons/help.svg";
import { LocalStorageUtils } from "./utils";

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
    return;
  }
  toggleHelp(!helpVisible);
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
    <PluginSidebar name="nfd-help-sidebar" title="Help Center" icon={<Help />}>
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
      }}
    />,
    DOM_TARGET
  );
};

newfoldEmbeddedHelp.renderEmbeddedHelp();
