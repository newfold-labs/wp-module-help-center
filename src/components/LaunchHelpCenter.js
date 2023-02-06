import { useState } from "@wordpress/element";
import { ReactComponent as HelpIcon } from "../icons/help.svg";
import { ReactComponent as LaunchIllustration } from "../icons/launch-illustration.svg";
import { updateWPSettings } from "../services";

const LaunchHelpCenter = ({ refreshSettings }) => {
  const [optedOutHelpCenter, SetoptedOutHelpCenter] = useState(false);
  const enableHelp = async () => {
    await updateWPSettings({
      nfd_help_center_enabled: true,
    });
    refreshSettings();
  };
  return (
    <div className="launch-help-center">
      {optedOutHelpCenter ? (
        <>
          <h1>No Problem!</h1>
          <p>
            If you ever need help, you can click on the
            <HelpIcon style={{ verticalAlign: "middle" }} /> icon up at the top
            of the screen.
          </p>
          <button
            onClick={() =>
              wp.data.dispatch("core/edit-post").closeGeneralSidebar()
            }
          >
            Close
          </button>
        </>
      ) : (
        <>
          <h1>How can we help?</h1>
          <LaunchIllustration />
          <p className="launch-description">
            Building a website doesn't have to be hard. Levarge our vast library
            of videos and help articles to get moving fast.
          </p>
          <div className="launch-action">
            <button onClick={enableHelp}>Launch Help Center</button>
          </div>
          <a onClick={() => SetoptedOutHelpCenter(true)}>
            No thanks, I'll come back if I need help
          </a>
        </>
      )}
    </div>
  );
};

export default LaunchHelpCenter;
