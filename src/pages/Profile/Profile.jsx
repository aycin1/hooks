import { useParams } from "react-router";
import CreatePost from "../../components/CreatePost/CreatePost";
import FollowButton from "../../components/FollowButton/FollowButton";
import Posts from "../../components/Posts/Posts";
import usePosts from "../../hooks/usePosts";
import useUsername from "../../hooks/useUsername";
import styles from "./Profile.module.css";

export default function Profile() {
  const thisUser = useUsername();
  const { username } = useParams();
  const posts = usePosts(username);

  return (
    <div className={styles.profile}>
      <div className={styles.topContainer}>
        <h3>{username}</h3>
        {username === thisUser ? (
          <CreatePost />
        ) : (
          <FollowButton username={username} />
        )}
      </div>

      <div className={styles.posts}>{posts && <Posts posts={posts} />}</div>
    </div>
  );
}
