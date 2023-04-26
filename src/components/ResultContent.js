import Feedback from "./Feedback";
import NoResults from "./NoResuts";

export const ResultContent = ({ content, noResult, postId }) => {
  if (noResult) {
    return <NoResults />;
  }

  return (
    <>
      <p dangerouslySetInnerHTML={{ __html: content }} />
      {content && content.length > 0 && <Feedback postId={postId} />}
    </>
  );
};
