import { ReactComponent as LaunchIllustration } from "../icons/launch-illustration.svg";
import { updateWPSettings } from "../services";

const LaunchHelpCenter = ({ refreshSettings }) => {
  const enableHelp = async () => {
    await updateWPSettings({
      nfd_help_center_enabled: true,
    });
    refreshSettings();
  };
  return (
    <div className="launch-help-center">
      <h1>How can we help?</h1>
      <LaunchIllustration />
      <p className="launch-description">
        Building a website doesn't have to be hard. Levarge our vast library of
        videos and help articles to get moving fast.
      </p>
      <div className="launch-actions">
        <button onClick={enableHelp} id="launch-btn">
          Launch Help Center
        </button>
        <a>No thanks, I'll come back if I need help</a>
      </div>
    </div>
  );
};

export default LaunchHelpCenter;
