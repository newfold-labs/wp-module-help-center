import { useState } from "@wordpress/element";
import { useNavigate } from "react-router-dom";
import { ReactComponent as SearchIcon } from "../icons/search.svg";

const Search = ({ searchParam }) => {
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState(searchParam);
  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Search for helpful guides and videos"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
      />
      <button
        onClick={() => {
          navigate(`/${searchInput}`);
        }}
      >
        <SearchIcon />
      </button>
    </div>
  );
};

export default Search;
