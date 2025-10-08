import CreatePost from "../../components/CreatePost/CreatePost";
import Posts from "../../components/Posts/Posts";
import UserSearch from "../../components/UserSearch/UserSearch";
import useAuth from "../../hooks/useAuth";
import usePosts from "../../hooks/usePosts";
import Follows from "./components/Follows";
import styles from "./Profile.module.css";

export default function Profile() {
  const { auth } = useAuth();

  const posts = usePosts(auth.username);

  return (
    <div className={styles.profile}>
      <div className={styles.topContainer}>
        <CreatePost />
        <h2>{auth.username}</h2>
      </div>
      <div className={styles.profileContainer}>
        <div className={styles.posts}>
          <Posts posts={posts} />
        </div>
        <div className={styles.users}>
          <UserSearch />
          <Follows />
        </div>
      </div>
    </div>
  );
}
