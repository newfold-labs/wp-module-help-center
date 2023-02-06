import { useEffect, useState } from "@wordpress/element";
import { useNavigate, useParams } from "react-router-dom";
import { data } from "../Data.js";
import { ReactComponent as VideoIcon } from "../icons/video.svg";
import Loader from "./Loader";
import NoSuggestionsFound from "./NoSuggestionsFound";
import Search from "./Search";

const Suggestions = () => {
  const [suggestions, setSuggestions] = useState(data);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  let { searchParam } = useParams();

  useEffect(() => {
    setIsLoading(true);
    const filteredData = data.filter((article) =>
      article.title.includes(searchParam ?? "")
    );
    setSuggestions(filteredData);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, [searchParam]);

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Search searchParam={searchParam} />
          {suggestions.length > 0 ? (
            <div className="suggestions-container">
              <p style={{ margin: "16px 0" }}>Recommended Resources</p>
              <h4 className="section-header">Videos</h4>
              {suggestions
                .filter((x) => x.type == "video")
                .map((video) => (
                  <div
                    className="video"
                    onClick={() => {
                      navigate(`/suggestion/${video.id}`);
                    }}
                  >
                    <VideoIcon className="video-icon"></VideoIcon>
                    <div className="video-summary">
                      <a>{video.title}</a>
                      <p className="description">{video.content}</p>
                    </div>
                    <hr />
                  </div>
                ))}

              <h4 className="section-header">Articles</h4>
              {suggestions
                .filter((x) => x.type == "article")
                .map((article) => (
                  <div
                    className="article"
                    onClick={() => {
                      navigate(`/suggestion/${article.id}`);
                    }}
                  >
                    <a>{article.title}</a>
                    <p className="description">{article.content}</p>
                    <hr />
                  </div>
                ))}
            </div>
          ) : (
            <NoSuggestionsFound />
          )}
        </>
      )}
    </div>
  );
};

export default Suggestions;
