import { useEffect, useState, useRef } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
//
import { Analytics, InteractionAPIs } from "../utils";

const Feedback = ({ postId }) => {
  const [status, setStatus] = useState("");
  const yesButtonRef = useRef(null);
  const noButtonRef = useRef(null);

  const postFeedback = async () => {
    if (status === "helpful" || status === "notHelpful") {
      InteractionAPIs.postFeedback(postId, status);
      Analytics.sendEvent('feedback', 'status');
    }
  };

  useEffect(() => {
    setStatus("");
    noButtonRef.current.className = "feedback-button no";
    yesButtonRef.current.className = "feedback-button yes";
  }, [postId]);

  useEffect(() => {
    postFeedback();
    if (status === "helpful") {
      yesButtonRef.current.className = "feedback-button yes selected-yes";
      noButtonRef.current.className = "feedback-button no";
    }
    if (status === "notHelpful") {
      noButtonRef.current.className = "feedback-button no selected-no";
      yesButtonRef.current.className = "feedback-button yes";
    }
  }, [status]);

  return (
    <div className="feedback-container">
      <div>
        <p>
          <b>{__('Did this result help you ?', 'wp-module-help-center')}</b>
        </p>
      </div>
      <div class="icon">
        <button
          ref={yesButtonRef}
          onClick={() => {
            setStatus("helpful");
          }}
          class="feedback-button yes"
        >
          {status === "helpful" && <>&#129395;</>} Yes
        </button>
        <button
          onClick={() => {
            setStatus("notHelpful");
          }}
          ref={noButtonRef}
          class="feedback-button no"
        >
          {status === "notHelpful" && <>&#128557;</>} No
        </button>
      </div>
    </div>
  );
};

export default Feedback;
