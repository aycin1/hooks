import { useState } from "react";
import Post from "./Post";
import styles from "./Posts.module.css";

export default function Posts({ posts }) {
  const [message, setMessage] = useState(undefined);

  function handleChange(msg) {
    setMessage(msg);
  }

  return (
    posts?.length > 0 &&
    posts.map((post) => (
      <div key={post.post_id} className={styles.post}>
        {message ? message : <Post post={post} handleChange={handleChange} />}
      </div>
    ))
  );
}
