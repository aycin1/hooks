import { faComments } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import Comments from "./Comments";
import styles from "./Posts.module.css";

export default function ToggleComments({ postID }) {
  const [showComments, setShowComments] = useState(false);
  return (
    <>
      <button
        className={styles.toggleCommentButton}
        onClick={() => setShowComments((oldValue) => !oldValue)}
      >
        <FontAwesomeIcon icon={faComments} />
      </button>
      {showComments && <Comments postID={postID} />}
    </>
  );
}
