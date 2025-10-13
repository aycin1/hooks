import Post from "./Post";
import styles from "./Posts.module.css";

export default function Posts({ posts }) {
  function mapPosts() {
    return (
      posts?.length &&
      posts.map((post) => (
        <div key={post.post_id} className={styles.post}>
          <Post post={post} />
        </div>
      ))
    );
  }
  return mapPosts();
}
