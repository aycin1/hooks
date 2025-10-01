import { useState } from "react";
import { NavLink } from "react-router";
import useAuth from "../../hooks/useAuth";
import PatternCard from "../PatternCard/PatternCard";
import Comments from "./Comments";
import EditAndDeleteButtons from "./EditAndDeleteButtons";
import Likes from "./Likes";
import styles from "./Posts.module.css";
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
    <>
      <EditAndDeleteButtons
        username={post.username}
        postID={post.post_id}
        currentCaption={post.caption}
      />
      <div className={styles.topContainer}>
        <RenderImage postID={post.post_id} />
        <div className={styles.side}>
          <PatternCard
            patternID={post.pattern_id}
            thumbnailOptions={thumbnailOptions}
            thumbnailOnly={false}
          />
          {post.username === auth.username ? (
            <NavLink to={"/profile"} className={styles.username}>
              {post.username}
            </NavLink>
          ) : (
            <NavLink to={`/user/${post.username}`} className={styles.username}>
              {post.username}
            </NavLink>
          )}
        </div>
      </div>
      <p className={styles.caption}>{post.caption}</p>
      <div>
        <Likes postID={post.post_id} />
        <button
          className={styles.toggleCommentButton}
          onClick={() => setShowComments((oldValue) => !oldValue)}
        >
          Comments
        </button>
        {showComments ? <Comments postID={post.post_id} /> : ""}
      </div>
    </>
  );
}
