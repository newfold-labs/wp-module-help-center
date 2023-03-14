import apiFetch from "@wordpress/api-fetch";
import { dispatch } from "@wordpress/data";
import { useState } from "@wordpress/element";
import useSWRMutation from "swr/mutation";
import { ReactComponent as HelpIcon } from "../icons/help.svg";
import { ReactComponent as LaunchIllustration } from "../icons/launch-illustration.svg";

const fetcher = (path, { arg: data }) =>
  apiFetch({ path, method: "POST", data });

const LaunchHelpCenter = ({ closeHelp }) => {
  const updateWPSettings = useSWRMutation("/wp/v2/settings", fetcher, {
    revalidateOnReconnect: false,
  });
  const [optedOutHelpCenter, setOptedOutHelpCenter] = useState(false);
  const enableHelp = async () => {
    await updateWPSettings.trigger({ nfd_help_center_enabled: true });
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
            onClick={() => {
              dispatch("core/edit-post").closeGeneralSidebar();
              closeHelp();
              setOptedOutHelpCenter(false);
            }}
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
          <a onClick={() => setOptedOutHelpCenter(true)}>
            No thanks, I'll come back if I need help
          </a>
        </>
      )}
    </div>
  );
};

export default LaunchHelpCenter;
