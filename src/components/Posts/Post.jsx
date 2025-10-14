import { NavLink } from "react-router";
import useAuth from "../../hooks/useAuth";
import PatternCard from "../PatternCard/PatternCard";
import RenderDropdown from "../RenderDropdown/RenderDropdown";
import EditAndDeleteButtons from "./EditAndDeleteButtons";
import Likes from "./Likes";
import styles from "./Posts.module.css";
import RenderImage from "./RenderImage";
import ToggleComments from "./ToggleComments";

export default function Post({ post, msgChange }) {
  const { auth } = useAuth();
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
    <>
      {auth.username === post.username && (
        <EditAndDeleteButtons
          username={post.username}
          postID={post.post_id}
          currentCaption={post.caption}
          msgChange={msgChange}
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
    </>
  );
}
