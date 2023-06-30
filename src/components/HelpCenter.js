import { useEffect, useState } from "@wordpress/element";
import algoliasearch from "algoliasearch";
import { Configure, Index, InstantSearch } from "react-instantsearch-hooks-web";
import SearchResults from "./SearchResults";
import { CapabilityAPI, LocalStorageUtils } from "../utils";

const HelpCenter = (props) => {
  // Set up the instant search results
  const searchClient = algoliasearch(
    "AVE0JWZU92",
    "eef54890add97ea2583ff1e417ff86ea"
  );

  const visible = LocalStorageUtils.getHelpVisible();
  const [helpEnabled, setHelpEnabled] = useState(false);
  const getHelpStatus = async () => {
    try {
      const response = await CapabilityAPI.getHelpCenterCapability();
      setHelpEnabled(response);
    } catch (exception) {
      setHelpEnabled(false);
    }
  };
  useEffect(() => {
    getHelpStatus();
  }, []);

  if (!helpEnabled || !visible) {
    return <></>;
  }

  return (
    <div className="nfd-help-center">
      <InstantSearch
        searchClient={searchClient}
        indexName="nfd_help_searchable_posts"
      >
        <Index indexName="nfd_help_searchable_posts">
          <Configure hitsPerPage={3} getRankingInfo={true} />
          <SearchResults />
        </Index>
      </InstantSearch>
    </div>
  );
};

export default HelpCenter;
