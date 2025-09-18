// import { useState } from "react";
import { Link } from "react-router";
import useAuth from "../../hooks/useAuth";
import PatternCard from "../PatternCard";
// import RenderImage from "";

export default function Post({ post }) {
  const { auth } = useAuth();
  //   const [showComments, setShowComments] = useState(false);

  //   function handleShowComments() {
  //     setShowComments((oldValue) => !oldValue);
  //   }

  return (
    <div className="postContainer">
      {/* <RenderImage postID={post.post_id} /> */}
      <div className="patternCardContainer">
        <PatternCard
          patternID={post.pattern_id}
          thumbnailOptions={{
            url: "thumbnail_url",
            style: {
              width: "100%",
              height: "auto",
              maxWidth: "70px",
            },
            maxHeight: "70px",
            withLink: true,
          }}
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

      {/* <div className="likesAndComments">
        <div className="buttonsContainer">
          <Likes postID={post.post_id} />
          <button
            className="toggleButton"
            onClick={(e) => handleShowComments(e)}
          >
            Comments
          </button>
        </div>
        <div className="comments">
          {showComments ? <Comments postID={post.post_id} /> : ""}
        </div>
      </div> */}
    </div>
  );
}
