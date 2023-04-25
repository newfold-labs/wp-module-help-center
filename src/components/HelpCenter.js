import apiFetch from "@wordpress/api-fetch";
import useSWR, { SWRConfig } from "swr";
import Loader from "./Loader";
import LaunchHelpCenter from "./LaunchHelpCenter";
import SearchResults from "./SearchResults";
import algoliasearch from "algoliasearch";
import { InstantSearch } from "react-instantsearch-hooks-web";

const HelpCenter = (props) => {
  const fetcher = (path) => apiFetch({ path });
  let { data, error } = useSWR("/wp/v2/settings", fetcher, {
    revalidateOnReconnect: false,
  });
  // Set up the instant search results
  const searchClient = algoliasearch(
    "AVE0JWZU92",
    "eef54890add97ea2583ff1e417ff86ea"
  );

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
          <InstantSearch
            searchClient={searchClient}
            indexName="nfd_help_searchable_posts"
          >
            <SearchResults />
          </InstantSearch>
        ) : (
          <LaunchHelpCenter closeHelp={props.closeHelp} />
        )}
      </div>
    </SWRConfig>
  );
};

export default HelpCenter;
