import React, { render } from "@wordpress/element";
import HelpCenter from "./components/HelpCenter";
import "../styles.scss";

let helpContainer = document.createElement("div");
helpContainer.id = "helpCenterContainer";
document.body.appendChild(helpContainer);

const DOM_TARGET = document.getElementById("helpCenterContainer");
render(<HelpCenter />, DOM_TARGET);
