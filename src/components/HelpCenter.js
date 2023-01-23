import { useState } from "@wordpress/element";
import { ReactComponent as CloseIcon } from "../icons/close.svg";
import { ReactComponent as QuestionIcon } from "../icons/question.svg";
import Modal from "./Modal";

const HelpCenter = () => {
  const [showModal, setShowModal] = useState(false);
  const Icon = showModal ? CloseIcon : QuestionIcon;
  return (
    <div className={`nfd-help-center-setup ${showModal ? "modal-open" : ""}`}>
      {showModal && <Modal setShowModal={setShowModal} />}
      <button
        className="nfd-help-center-button"
        onClick={() => setShowModal(!showModal)}
      >
        <Icon style={{ verticalAlign: "middle" }} />
      </button>
    </div>
  );
};

export default HelpCenter;
