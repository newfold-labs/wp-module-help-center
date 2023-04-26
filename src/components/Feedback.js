import { useEffect, useState } from "@wordpress/element";
//
import { ReactComponent as ThumbsUp } from "../icons/thumbs-up.svg";
import { ReactComponent as ThumbsDown } from "../icons/thumbs-down.svg";
import { InteractionAPIs } from "../utils";

const Feedback = ({ postId }) => {
  const [status, setStatus] = useState("");

  const postFeedback = async () => {
    if (status === "helpful" || status === "notHelpful") {
      InteractionAPIs.postFeedback(postId, status);
    }
  };

  useEffect(() => {
    setStatus("");
  }, [postId]);

  useEffect(() => {
    postFeedback();
  }, [status]);

  return (
    <div className="feedback-container">
      <div>
        <p>
          <b>Did this result help you ?</b>
        </p>
      </div>
      <div className="icon">
        <ThumbsUp
          onClick={() => {
            setStatus("helpful");
          }}
          fill={status === "helpful" && "blue"}
        />
      </div>
      <div className="icon">
        <ThumbsDown
          fill={status === "notHelpful" && "blue"}
          onClick={() => {
            setStatus("notHelpful");
          }}
        />
      </div>
    </div>
  );
};

export default Feedback;
