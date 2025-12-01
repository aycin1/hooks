import { useParams } from "react-router";
import CreatePost from "../../components/CreatePost/CreatePost";
import FollowButton from "../../components/FollowButton/FollowButton";
import Follows from "../../components/Follows/Follows";
import Posts from "../../components/Posts/Posts";
import UserSearch from "../../components/UserSearch/UserSearch";
import usePosts from "../../hooks/usePosts";
import useUsername from "../../hooks/useUsername";
import styles from "./Profile.module.css";
export default function Profile() {
  const thisUser = useUsername();
  const { username } = useParams();
  const posts = usePosts(username);

  return (
    <div className={styles.profile}>
      <div className={styles.lhs}>
        <div className={styles.banner}>
          <h3 className={styles.username}>{username}</h3>

          {username === thisUser ? (
            <CreatePost />
          ) : (
            <FollowButton
              username={username}
              style={{ padding: "0.4em 1.4em", fontSize: " 1.1em" }}
            />
          )}
        </div>
        <div className={styles.posts}>{posts && <Posts posts={posts} />}</div>
      </div>
      <div className={styles.sidebar}>
        <UserSearch />
        <Follows />
      </div>
    </div>
  );
}
