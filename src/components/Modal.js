import { useEffect, useState } from "@wordpress/element";
import { ReactComponent as Loader } from "../icons/loader.svg";
import { ReactComponent as NoResultIllustration } from "../icons/no-result.svg";
import { ReactComponent as SearchIcon } from "../icons/search.svg";
import { ReactComponent as VideoIcon } from "../icons/video.svg";
import { ReactComponent as Arrow } from "../icons/back-arrow.svg";
import {
  MemoryRouter,
  Route,
  Routes,
  useNavigate,
  useParams,
} from "react-router-dom";

const data = [
  {
    id: 1,
    type: "article",
    title: "How to set your homepage",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Orci ac auctor augue mauris augue neque gravida in fermentum. Magnis dis parturient montes nascetur ridiculus mus mauris. Morbi tincidunt ornare massa eget egestas. Odio ut sem nulla pharetra diam. Quis imperdiet massa tincidunt nunc pulvinar sapien. Eu nisl nunc mi ipsum faucibus vitae aliquet nec ullamcorper. Amet commodo nulla facilisi nullam vehicula ipsum. Diam phasellus vestibulum lorem sed risus ultricies tristique nulla aliquet. Id donec ultrices tincidunt arcu non sodales neque sodales ut. Orci eu lobortis elementum nibh. Pulvinar mattis nunc sed blandit libero volutpat sed. Elementum facilisis leo vel fringilla est.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Orci ac auctor augue mauris augue neque gravida in fermentum. Magnis dis parturient montes nascetur ridiculus mus mauris. Morbi tincidunt ornare massa eget egestas. Odio ut sem nulla pharetra diam. Quis imperdiet massa tincidunt nunc pulvinar sapien. Eu nisl nunc mi ipsum faucibus vitae aliquet nec ullamcorper. Amet commodo nulla facilisi nullam vehicula ipsum. Diam phasellus vestibulum lorem sed risus ultricies tristique nulla aliquet. Id donec ultrices tincidunt arcu non sodales neque sodales ut. Orci eu lobortis elementum nibh. Pulvinar mattis nunc sed blandit libero volutpat sed. Elementum facilisis leo vel fringilla est.",
  },
  {
    id: 2,
    type: "article",
    title: "How to create pages",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Orci ac auctor augue mauris augue neque gravida in fermentum. Magnis dis parturient montes nascetur ridiculus mus mauris. Morbi tincidunt ornare massa eget egestas. Odio ut sem nulla pharetra diam. Quis imperdiet massa tincidunt nunc pulvinar sapien. Eu nisl nunc mi ipsum faucibus vitae aliquet nec ullamcorper. Amet commodo nulla facilisi nullam vehicula ipsum. Diam phasellus vestibulum lorem sed risus ultricies tristique nulla aliquet. Id donec ultrices tincidunt arcu non sodales neque sodales ut. Orci eu lobortis elementum nibh. Pulvinar mattis nunc sed blandit libero volutpat sed. Elementum facilisis leo vel fringilla est.",
  },
  {
    id: 3,
    type: "video",
    title: "How to create a user in WordPress",
    url: "https://www.youtube.com/embed/tgbNymZ7vqY",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
];
const getArticleById = (id) => data.find((x) => x.id == id);

const NoResult = () => {
  return (
    <div>
      <p>Result based on your search:</p>
      <h4>Sorry, we don't have any content for that yet.</h4>
      <hr />
      <NoResultIllustration />
      <p>This tool is being built and doesn't always have a match.</p>
      <p>
        In the meantime, try searching our <a>Resource center.</a>
      </p>
      <hr />
    </div>
  );
};

const SearchingLoader = () => {
  return (
    <>
      <p>searching...</p>
      <Loader />
    </>
  );
};

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

const Article = () => {
  let { id } = useParams();
  const navigate = useNavigate();
  const post = getArticleById(id);
  return (
    <div className="article-container" data-variant={post.type}>
      <a onClick={() => navigate(-1)}>
        <Arrow style={{ verticalAlign: "middle" }} />
        Back
      </a>
      <h3>{post.title}</h3>
      {post.type == "video" && <iframe src={post.url}></iframe>}
      <p>{post.content}</p>
    </div>
  );
};

const Articles = () => {
  const [articleList, setArticleList] = useState(data);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  let { searchParam } = useParams();

  useEffect(() => {
    setIsLoading(true);
    const filteredData = data.filter((article) =>
      article.title.includes(searchParam ?? "")
    );
    setArticleList(filteredData);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, [searchParam]);

  return (
    <div style={{ width: "399px" }}>
      <Header />
      {isLoading ? (
        <SearchingLoader />
      ) : (
        <>
          {articleList.length > 0 ? (
            <div className="article-list-container">
              <p style={{ margin: "8px 0" }}>Popular results for this page:</p>
              <h4>Videos</h4>
              {articleList
                .filter((x) => x.type == "video")
                .map((video) => (
                  <div
                    className="video"
                    onClick={() => {
                      navigate(`/article/${video.id}`);
                    }}
                  >
                    <VideoIcon className="video-icon"></VideoIcon>
                    <div className="video-summary">
                      <a>{video.title}</a>
                      <p className="description">{video.content}</p>
                    </div>
                  </div>
                ))}
              <hr />
              <h4>Articles</h4>
              {articleList
                .filter((x) => x.type == "article")
                .map((article) => (
                  <div
                    className="article"
                    onClick={() => {
                      navigate(`/article/${article.id}`);
                    }}
                  >
                    <a>{article.title}</a>
                    <p className="description">{article.content}</p>
                  </div>
                ))}
              <hr />
            </div>
          ) : (
            <NoResult />
          )}
        </>
      )}
      <Search searchParam={searchParam}/>
      <Footer />
    </div>
  );
};

const HelpCenterRoutes = () => {
  return (
    <MemoryRouter>
      <Routes>
        <Route exact path="/" element={<Articles />} />
        <Route exact path="/article/:id" element={<Article />} />
        <Route exact path="/:searchParam" element={<Articles />} />
      </Routes>
    </MemoryRouter>
  );
};

const Header = () => {
  return (
    <div className="modal-header">
      <h3 className="heading">Need help?</h3>
    </div>
  );
};

const Footer = () => {
  return (
    <div className="modal-footer">
      <span>v. 0.04 beta</span>
      <a>Don't show me this again</a>
    </div>
  );
};

const Modal = (props) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-body">
          <HelpCenterRoutes />
        </div>
      </div>
    </div>
  );
};

export default Modal;
