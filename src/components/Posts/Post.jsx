import { NavLink } from "react-router";
import useUsername from "../../hooks/useUsername";
import PatternCard from "../PatternCard/PatternCard";
import RenderDropdown from "../RenderDropdown/RenderDropdown";
import EditAndDeleteButtons from "./EditAndDeleteButtons";
import Likes from "./Likes";
import styles from "./Posts.module.css";
import RenderImage from "./RenderImage";
import ToggleComments from "./ToggleComments";

export default function Post({ post, handleChange }) {
  const thisUser = useUsername();

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
          <PatternCard
            patternID={post.pattern_id}
            thumbnailOptions={thumbnailOptions}
          />
          <RenderDropdown patternID={post.pattern_id} />
          <NavLink to={`/profile/${post.username}`} className={styles.username}>
            {post.username}
          </NavLink>
        </div>
      </div>
      <p className={styles.caption}>{post.caption}</p>
      <div>
        <Likes postID={post.post_id} />
        <ToggleComments postID={post.post_id} />
      </div>
    </div>
  );
}
