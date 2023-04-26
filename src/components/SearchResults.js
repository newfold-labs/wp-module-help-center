import { debounce } from "lodash";
import { useEffect, useState, useMemo } from "@wordpress/element";
import { useInstantSearch, useSearchBox } from "react-instantsearch-hooks-web";
import moduleAI from "@newfold-labs/wp-module-ai";
//
import { ReactComponent as SearchIcon } from "../icons/search.svg";
import { ReactComponent as OpenAIIcon } from "../icons/openai.svg";
//
import { AlgoliaResult } from "./AlgoliaResult";
import Loader from "./Loader";
import { ResultContent } from "./ResultContent";

const SearchResults = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [noResult, setNoResult] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [searchButtonVisible, setSearchButtonVisible] = useState(false);
  const [resultContent, setResultContent] = useState("");
  const [postId, setPostId] = useState();
  const { query, refine, clear } = useSearchBox();
  const { results } = useInstantSearch();

  const getAIResult = async () => {
    setIsLoading(true);
    try {
      const result = await moduleAI.search.getSearchResult(query, "helpcenter");
      setResultContent(result["result"].replace(/\n/g, "<br />"));
      setPostId(result["post_id"]);
    } catch (exception) {
      console.log(exception);
      setNoResult(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (searchInput && searchInput.length > 0) {
      setSearchButtonVisible(true);
      return;
    }
    setSearchButtonVisible(false);
  }, [searchInput]);

  const debouncedResults = useMemo(() => {
    return debounce(function (query) {
      if (query && query.length === 0) {
        clear();
      }
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

  return (
    <>
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
            setResultContent("");
            debouncedResults(searchInput);
          }}
        />
        <button
          style={{
            ...(!searchButtonVisible && {
              display: "none",
            }),
          }}
          onClick={async () => {
            await getAIResult();
          }}
        >
          Ask
        </button>
      </div>
      <div className="attribute">
        <p>
          Powered by <OpenAIIcon /> OpenAI
        </p>
        <p>
          <span>{searchInput ? searchInput.length : 0}/144</span>
        </p>
      </div>
      <ResultContent
        content={resultContent}
        noResult={noResult}
        postId={postId}
      />

      {results.hits.length > 0 && (
        <p>
          <b>
            {resultContent.length > 0
              ? "Other Resources"
              : "Search Suggestions"}
          </b>
        </p>
      )}
      {results.hits.slice(0, 3).map((result) => {
        return (
          <>
            <AlgoliaResult
              searchTitle={result.post_title}
              onGo={() => {
                setResultContent(result.content.replace(/\n/g, "<br />"));
                setPostId(result.post_id);
                setSearchInput(query);
              }}
            />
          </>
        );
      })}
    </>
  );
};

export default SearchResults;
