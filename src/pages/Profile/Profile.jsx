import { useEffect, useState } from "react";
import CreatePost from "../../components/CreatePost/CreatePost";
import Posts from "../../components/Posts/Posts";
import UserSearch from "../../components/UserSearch/UserSearch";
import useAuth from "../../hooks/useAuth";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import Follows from "./components/Follows";
import styles from "./Profile.module.css";

export default function Profile() {
  const [posts, setPosts] = useState();
  const { auth } = useAuth();
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    async function getPosts() {
      try {
        const response = await axiosPrivate.get(`/users`, {
          signal: controller.signal,
        });

        isMounted && setPosts(response?.data?.posts);
      } catch (err) {
        console.log(err);
      }
    }

    getPosts();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [axiosPrivate]);

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
