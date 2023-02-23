import { PluginSidebar } from "@wordpress/edit-post";
import React, { render } from "@wordpress/element";
import { registerPlugin } from "@wordpress/plugins";
import "../styles.scss";
import HelpCenter from "./components/HelpCenter";
import Modal from "./components/Modal";
import { ReactComponent as Help } from "./icons/help.svg";

const wpContentContainer = document.getElementById("wpcontent");

const toggleHelp = () => {
  wpContentContainer.classList.toggle("wpcontent-container");
  let nfdHelpContainer = document.getElementById("nfd-help-center");
  nfdHelpContainer.classList.toggle("help-container");
};

window.toggleNFDLaunchedEmbeddedHelp = toggleHelp;
window.toggleNFDUnlaunchedEmbeddedHelp =
  function toggleNFDUnlaunchedEmbeddedHelp() {
    let helpContainer = document.getElementById("nfd-help-center");
    wpContentContainer.removeChild(helpContainer);
    renderEmbeddedHelp();
    toggleHelp();
  };

//For rendering embedded help in Add, edit and View Pages
const HelpCenterPluginSidebar = () => (
  <PluginSidebar name="nfd-help-sidebar" title="Help Center" icon=<Help />>
    <HelpCenter />
  </PluginSidebar>
);

registerPlugin("nfd-help-panel", {
  render: HelpCenterPluginSidebar,
});

//For rendering embedded help in Admin Pages
window.renderEmbeddedHelp = function renderEmbeddedHelp() {
  let helpContainer = document.createElement("div");
  helpContainer.id = "nfd-help-center";
  wpContentContainer.appendChild(helpContainer);
  const DOM_TARGET = document.getElementById("nfd-help-center");
  render(<Modal onClose={toggleHelp} />, DOM_TARGET);
};

renderEmbeddedHelp();
