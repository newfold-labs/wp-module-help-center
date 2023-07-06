import { useEffect, useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
//
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

  const [refresh, setRefresh] = useState(false);

  return (
    <div className="modal">
      <div className="modal-header">
        <h3 className="heading">
          <span className="icon">
            <Help />
          </span>
          {__("Help Center", "wp-module-help-center")}
        </h3>
        <button
          className="close-button"
          onClick={() => {
            onClose();
            setRefresh(!refresh);
          }}
        >
          <div className="icon-button">
            <CloseIcon />
          </div>
        </button>
      </div>
      <HelpCenter
        closeHelp={() => {
          onClose();
          setRefresh(!refresh);
        }}
        refresh={refresh}
      />
    </div>
  );
};

export default Modal;
