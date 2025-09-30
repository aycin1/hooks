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
      // return "No posts";
    }
  }
  return <div className={styles.posts}>{mapPosts()}</div>;
}
