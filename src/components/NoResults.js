import { ReactComponent as NoResultIllustration } from "../icons/no-result.svg";

const NoResults = () => {
  return (
    <div>
      <p>Result based on your search:</p>
      <h4>Sorry, we don't have any content for that yet.</h4>
      <hr />
      <NoResultIllustration />
      <p>This tool is being built and doesn't always have a match.</p>
      <p>
        In the meantime, try searching our <a>Resource center.</a>
      </p>
      <hr />
    </div>
  );
};

export default NoResults;
