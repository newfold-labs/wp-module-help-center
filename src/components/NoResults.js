import { __ } from "@wordpress/i18n";
import { ReactComponent as NoResultIllustration } from "../icons/no-result.svg";

const NoResults = () => {
  return (
    <div>
      <p>{__("Result based on your search:", "wp-module-help-center")}</p>
      <h4>
        {__(
          "Sorry, we don't have any content for that yet.",
          "wp-module-help-center"
        )}
      </h4>
      <hr />
      <NoResultIllustration />
      <p>
        {__(
          "This tool is being built and doesn't always have a match.",
          "wp-module-help-center"
        )}
      </p>
      <p>
        {__("In the meantime, try searching our", "wp-module-help-center")}{" "}
        <a href="https://www.bluehost.com/help">
          {__("Resource center.", "wp-module-help-center")}
        </a>
      </p>
      <hr />
    </div>
  );
};

export default NoResults;
