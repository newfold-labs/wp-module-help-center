import { ReactComponent as CloseIcon } from "../icons/close.svg";
import HelpCenter from "./HelpCenter";

const Modal = ({ onClose }) => {
  return (
    <div className="modal">
      <div className="modal-header">
        <h3 className="heading">Need help?</h3>
        <button className="close-button" onClick={onClose}>
          <CloseIcon />
        </button>
      </div>
      <HelpCenter closeHelp={onClose} />
    </div>
  );
};

export default Modal;
