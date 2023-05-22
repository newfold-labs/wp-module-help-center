import { useEffect } from "@wordpress/element";
import { ReactComponent as CloseIcon } from "../icons/close.svg";
import { ReactComponent as Help } from "../icons/help.svg";
import HelpCenter from "./HelpCenter";

import { toggleHelp } from "..";
import { LocalStorageUtils } from "../utils";

const Modal = ({ onClose }) => {
  useEffect(() => {
    const helpVisible = LocalStorageUtils.getHelpVisible();
    toggleHelp(helpVisible);
  }, []);

  return (
    <div className="modal">
      <div className="modal-header">
        <h3 className="heading">
          <span className="icon">
            <Help />
          </span>
          Help Center
        </h3>
        <button className="close-button" onClick={onClose}>
          <div className="icon-button">
            <CloseIcon />
          </div>
        </button>
      </div>
      <HelpCenter closeHelp={onClose} />
    </div>
  );
};

export default Modal;
