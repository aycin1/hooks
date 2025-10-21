import { useState } from "react";
import { NavLink } from "react-router";
import useUsername from "../../hooks/useUsername";
import Dropdown from "../Dropdown/Dropdown";
import PatternCard from "../PatternCard/PatternCard";
import EditAndDeleteButtons from "./EditAndDeleteButtons";
import Likes from "./Likes";
import styles from "./Posts.module.css";
import RenderImage from "./RenderImage";
import ToggleComments from "./ToggleComments";

export default function Post({ post }) {
  const thisUser = useUsername();
  const [message, setMessage] = useState(undefined);

  function handleChange(msg) {
    setMessage(msg);
  }

  const thumbnailOptions = {
    urlSize: "thumbnail_url",
    style: {
      width: "100%",
      height: "auto",
      maxWidth: "70px",
    },
    maxHeight: "70px",
  };

  return (
    <div className={styles.postCard}>
      {message ? (
        message
      ) : (
        <>
          {post.username === thisUser && (
            <EditAndDeleteButtons
              username={post.username}
              postID={post.post_id}
              currentCaption={post.caption}
              handleChange={handleChange}
            />
          )}
          <div className={styles.topContainer}>
            <RenderImage postID={post.post_id} />
            <div className={styles.side}>
              <NavLink
                to={`/profile/${post.username}`}
                className={styles.username}
              >
                {post.username}
              </NavLink>
              <div>
                <PatternCard
                  patternID={post.pattern_id}
                  thumbnailOptions={thumbnailOptions}
                />
                <Dropdown patternID={post.pattern_id} />
              </div>
            </div>
          </div>
          <p className={styles.caption}>{post.caption}</p>
          <Likes postID={post.post_id} />
          <ToggleComments postID={post.post_id} />
        </>
      )}
    </div>
  );
}
