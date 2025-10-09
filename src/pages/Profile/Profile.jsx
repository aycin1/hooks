import { useParams } from "react-router";
import CreatePost from "../../components/CreatePost/CreatePost";
import FollowButton from "../../components/FollowButton/FollowButton";
import Posts from "../../components/Posts/Posts";
import UserSearch from "../../components/UserSearch/UserSearch";
import useAuth from "../../hooks/useAuth";
import usePosts from "../../hooks/usePosts";
import Follows from "./components/Follows";
import styles from "./Profile.module.css";

export default function Profile() {
  const { auth } = useAuth();
  const { username } = useParams();
  const posts = usePosts(username);

  return (
    <div className={styles.profile}>
      <div className={styles.topContainer}>
        <h3>{username}</h3>
        {username === auth.username ? (
          <CreatePost />
        ) : (
          <FollowButton username={username} />
        )}
      </div>
      <div className={styles.profileContainer}>
        <div className={styles.posts}>
          <Posts posts={posts} />
        </div>
        <div className={styles.users}>
          <UserSearch />
          {username === auth.username && <Follows />}
        </div>
      </div>
    </div>
  );
}
