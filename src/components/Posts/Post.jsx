import { useState } from "react";
import { Link } from "react-router";
import useAuth from "../../hooks/useAuth";
import PatternCard from "../PatternCard";
import Comments from "./Comments";
import Likes from "./Likes";
import RenderImage from "./RenderImage";

export default function Post({ post }) {
  const { auth } = useAuth();
  const [showComments, setShowComments] = useState(false);
  const thumbnailOptions = {
    urlSize: "thumbnail_url",
    style: {
      width: "100%",
      height: "auto",
      maxWidth: "70px",
    },
    maxHeight: "70px",
    withLink: true,
  };

  return (
    <div className="postContainer">
      <RenderImage postID={post.post_id} />
      <div className="patternCardContainer">
        <PatternCard
          patternID={post.pattern_id}
          thumbnailOptions={thumbnailOptions}
          thumbnailOnly={false}
        />
      </div>
      <p className="caption">{post.caption}</p>
      <div className="username">
        {post.username === auth.username ? (
          <Link to={"/profile"}>{post.username}</Link>
        ) : (
          <Link to={`/user/${post.username}`}>{post.username}</Link>
        )}
      </div>

      <Likes postID={post.post_id} />
      <button
        className="commentsButton"
        onClick={() => setShowComments((oldValue) => !oldValue)}
      >
        Comments
      </button>
      {showComments ? <Comments postID={post.post_id} /> : ""}
    </div>
  );
}
