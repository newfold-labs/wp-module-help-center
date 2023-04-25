import { debounce } from "lodash";
import { useEffect, useState, useMemo } from "@wordpress/element";
import { useInstantSearch, useSearchBox } from "react-instantsearch-hooks-web";
//
import { ReactComponent as SearchIcon } from "../icons/search.svg";
import { ReactComponent as OpenAIIcon } from "../icons/openai.svg";
//
import { AlgoliaResult } from "./AlgoliaResult";
import Loader from "./Loader";

const SearchResults = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [searchButtonVisible, setSearchButtonVisible] = useState(false);
  const { refine, clear } = useSearchBox();
  const { results } = useInstantSearch();

  useEffect(() => {
    if (searchInput && searchInput.length > 0) {
      setSearchButtonVisible(true);
      return;
    }
    setSearchButtonVisible(false);
  }, [searchInput]);

  const debouncedResults = useMemo(() => {
    return debounce(function (query) {
      refine(query);
    }, 300);
  }, []);

  // Clear any debounce problems
  useEffect(() => {
    debouncedResults.cancel();
  }, []);

  if (isLoading) {
    return (
      <>
        <p>searching...</p>
        <Loader />
      </>
    );
  }

  const SearchContainer = () => {
    return (
      <div className="search-container">
        <button>
          <SearchIcon />
        </button>
        <input
          type="text"
          style={{
            flexGrow: 2,
          }}
          value={searchInput}
          maxLength="144"
          placeholder="Ask me anything..."
          onChange={(e) => {
            setSearchInput(e.target.value);
            debouncedResults(searchInput);
          }}
        />
        <button
          style={{
            ...(!searchButtonVisible && {
              display: "none",
            }),
          }}
        >
          Ask
        </button>
      </div>
    );
  };

  const Attribute = () => {
    <div className="attribute">
      <p>
        Powered by <OpenAIIcon /> OpenAI
      </p>
      <p>
        <span>{searchInput ? searchInput.length : 0}/144</span>
      </p>
    </div>;
  };

  return (
    <>
      <SearchContainer />
      <Attribute />
      {results.hits.map((result) => {
        return <AlgoliaResult searchTitle={result.post_title} />;
      })}
    </>
  );
};

export default SearchResults;
