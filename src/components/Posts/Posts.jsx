import Post from "./Post";
import styles from "./Posts.module.css";

export default function Posts({ posts }) {
  return (
    <div className={styles.posts}>
      {posts?.length > 0 &&
        posts.map((post) => (
          <div key={post.post_id} className={styles.post}>
            <Post post={post} />
          </div>
        ))}
    </div>
  );
}
