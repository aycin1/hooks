import CreatePost from "../../components/CreatePost/CreatePost";
import Follows from "../../components/Follows/Follows";
import Posts from "../../components/Posts/Posts";
import UserSearch from "../../components/UserSearch/UserSearch";
import usePosts from "../../hooks/usePosts";
import styles from "./Feed.module.css";

export default function Feed() {
  const posts = usePosts();

  return (
    <div className={styles.feed}>
      <CreatePost />
      <div className={styles.sidebar}>
        <UserSearch />
        <Follows />
      </div>
      <div className={styles.posts}>
        <Posts posts={posts} />
      </div>
    </div>
  );
}
