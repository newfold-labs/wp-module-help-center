import React, { render } from "@wordpress/element";
import HelpCenter from "./components/HelpCenter";
import "../styles.scss";

let helpContainer = document.createElement("div");
helpContainer.id = "nfd-help-center";
document.body.appendChild(helpContainer);
const DOM_TARGET = document.getElementById("nfd-help-center");
render(<HelpCenter />, DOM_TARGET);
