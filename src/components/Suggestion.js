import { useNavigate, useParams } from "react-router-dom";
import { getArticleById } from "../data.js";
import { ReactComponent as Arrow } from "../icons/back-arrow.svg";

const Suggestion = () => {
  let { id } = useParams();
  const navigate = useNavigate();
  const post = getArticleById(id);
  return (
    <div className="suggestion" data-variant={post.type}>
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
export default Suggestion;
