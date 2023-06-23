import { Configure, Index, InstantSearch } from "react-instantsearch-hooks-web";
import SearchResults from "./SearchResults";
import algoliasearch from "algoliasearch";

const HelpCenter = (props) => {
  // Set up the instant search results
  const searchClient = algoliasearch(
    "AVE0JWZU92",
    "eef54890add97ea2583ff1e417ff86ea"
  );

  return (
    <div className="nfd-help-center">
      <InstantSearch
        searchClient={searchClient}
        indexName="nfd_help_searchable_posts"
      >
        <Index indexName="nfd_help_searchable_posts">
          <Configure hitsPerPage={3} getRankingInfo={true} />
          <SearchResults refresh={props.refresh} />
        </Index>
      </InstantSearch>
    </div>
  );
};

export default HelpCenter;
