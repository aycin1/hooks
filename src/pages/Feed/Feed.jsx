import CreatePost from "../../components/CreatePost/CreatePost";
import Posts from "../../components/Posts/Posts";
import UserSearch from "../../components/UserSearch/UserSearch";
import usePosts from "../../hooks/usePosts";
import Follows from "./components/Follows";
import styles from "./Feed.module.css";

export default function Feed() {
  const posts = usePosts();

  return (
    <div className={styles.feed}>
      <div className={styles.posts}>
        <CreatePost />

        <Posts posts={posts} />
      </div>
      <div className={styles.sidebar}>
        <UserSearch />
        <Follows />
      </div>
    </div>
  );
}
