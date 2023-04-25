import { ReactComponent as CloseIcon } from "../icons/close.svg";
import { ReactComponent as Help } from "../icons/help.svg";
import HelpCenter from "./HelpCenter";

const Modal = ({ onClose }) => {
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
