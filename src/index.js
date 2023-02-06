import { PluginSidebar } from "@wordpress/edit-post";
import React from "@wordpress/element";
import { registerPlugin } from "@wordpress/plugins";
import "../styles.scss";
import HelpCenter from "./components/HelpCenter";

const icon = "dashicons-editor-help";

const HelpCenterPluginSidebar = () => (
  <PluginSidebar
    name="plugin-sidebar-test"
    title="Help Center"
    icon=<svg
      width="26"
      height="26"
      viewBox="0 0 26 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M12.9998 2.16663C7.01659 2.16663 2.1665 7.01671 2.1665 13C2.1665 18.9832 7.01659 23.8333 12.9998 23.8333C18.9831 23.8333 23.8332 18.9832 23.8332 13C23.8332 7.01671 18.9831 2.16663 12.9998 2.16663ZM11.9165 19.5V17.3333H14.0832V19.5H11.9165ZM14.0832 16.25V15.0139C15.0117 14.7759 15.8347 14.2361 16.423 13.4793C17.0113 12.7226 17.3315 11.7918 17.3332 10.8333C17.3332 9.68402 16.8766 8.58182 16.064 7.76916C15.2513 6.9565 14.1491 6.49996 12.9998 6.49996C11.8506 6.49996 10.7484 6.9565 9.93571 7.76916C9.12305 8.58182 8.6665 9.68402 8.6665 10.8333H10.8332C10.8332 9.63837 11.8049 8.66663 12.9998 8.66663C14.1948 8.66663 15.1665 9.63837 15.1665 10.8333C15.1665 12.0282 14.1948 13 12.9998 13C12.7125 13 12.437 13.1141 12.2338 13.3173C12.0306 13.5204 11.9165 13.796 11.9165 14.0833V16.25H14.0832Z"
        fill="#196BDE"
      />
    </svg>
  >
    <HelpCenter />
  </PluginSidebar>
);

registerPlugin("plugin-document-setting-panel-demo", {
  render: HelpCenterPluginSidebar,
});
