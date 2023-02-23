import apiFetch from "@wordpress/api-fetch";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import useSWR, { SWRConfig } from "swr";
import Loader from "./Loader";
import LaunchHelpCenter from "./LaunchHelpCenter";
import Suggestions from "./Suggestions";
import Suggestion from "./Suggestion";

const HelpCenterRoutes = () => {
  return (
    <MemoryRouter>
      <Routes>
        <Route exact path="/" element={<Suggestions />} />
        <Route exact path="/suggestion/:id" element={<Suggestion />} />
        <Route exact path="/:searchParam" element={<Suggestions />} />
      </Routes>
    </MemoryRouter>
  );
};

const HelpCenter = (props) => {
  const fetcher = (path) => apiFetch({ path });
  let {
    data,
    error,
    mutate: refreshSettings,
  } = useSWR("/wp/v2/settings", fetcher, {
    revalidateOnReconnect: false,
  });
  return (
    <SWRConfig
      value={{
        fetcher,
        revalidateOnReconnect: false,
      }}
    >
      <div className="nfd-help-center">
        {data === undefined ? (
          <Loader />
        ) : data.nfd_help_center_enabled ? (
          <HelpCenterRoutes />
        ) : (
          <LaunchHelpCenter
            refreshSettings={refreshSettings}
            closeHelp={props.closeHelp}
          />
        )}
      </div>
    </SWRConfig>
  );
};

export default HelpCenter;
