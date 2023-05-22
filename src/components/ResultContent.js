import Feedback from "./Feedback";
import NoResults from "./NoResults";

export const ResultContent = ({ content, noResult, postId }) => {
  if (noResult) {
    return <NoResults />;
  }

  if (content && content.length > 0) {
    return (
      <>
        <h4>Follow these steps: </h4>
        <p dangerouslySetInnerHTML={{ __html: content }} />
        {content && content.length > 0 && <Feedback postId={postId} />}
      </>
    );
  }

  return <></>;
};
