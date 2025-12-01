import Posts from "../../components/Posts/Posts";
import usePosts from "../../hooks/usePosts";
import useUsername from "../../hooks/useUsername";
import UserSearch from "./../../components/UserSearch/UserSearch";
import Dashboard from "./components/Dashboard";
import styles from "./Home.module.css";

export default function Home() {
  const username = useUsername();
  const posts = usePosts();
  const snippet = [];
  for (let i = 0; i < 2; i++) {
    if (posts?.[i]) {
      snippet.push(posts[i]);
    }
  }

  return (
    <div className={styles.home}>
      <h2 className={styles.heading}>Welcome, {username}!</h2>
      <Dashboard />

      <div className={styles.userSearch}>
        <UserSearch />
      </div>
      <div className={styles.postsContainer}>
        <h3 className={styles.heading}>Most recent posts in your feed:</h3>
        <div className={styles.posts}>
          <Posts posts={snippet} />
        </div>
      </div>
    </div>
  );
}
