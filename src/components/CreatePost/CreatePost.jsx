import { useState } from "react";
import styles from "./CreatePost.module.css";
import CreatePostOverlay from "./CreatePostOverlay";

export default function CreatePost() {
  const [isClicked, setIsClicked] = useState(false);

  return (
    <>
      <CreatePostOverlay
        openClick={isClicked}
        closeClick={() => setIsClicked(false)}
      />
      <button
        onClick={() => setIsClicked(true)}
        className={styles.addPostButton}
      >
        add a post!
      </button>
    </>
  );
}
