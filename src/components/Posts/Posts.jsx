import Post from "./Post";
import styles from "./Posts.module.css";

export default function Posts({ posts }) {
  function mapPosts() {
    if (posts?.length) {
      return posts.map((post) => (
        <div key={post.post_id} className={styles.post}>
          <Post post={post} />
        </div>
      ));
    } else {
      return <h4>No posts yet!</h4>;
    }
  }
  return mapPosts();
}
