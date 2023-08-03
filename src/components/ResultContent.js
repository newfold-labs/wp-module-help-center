import { __ } from "@wordpress/i18n";
//
import Feedback from "./Feedback";
import NoResults from "./NoResults";

export const ResultContent = ({ content, noResult, postId, source }) => {
  if (noResult) {
    return <NoResults />;
  }

  if (content && content.length > 0) {
    return (
      <>
        <h4>{__("Follow these steps:", "wp-module-help-center")}</h4>
        <p dangerouslySetInnerHTML={{ __html: content }} />
        {content && content.length > 0 && (
          <Feedback postId={postId} source={source} />
        )}
      </>
    );
  }

  return <></>;
};
