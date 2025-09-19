import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import Posts from "./Posts/Posts";
import Follows from "./User/Follows";
import UserSearch from "./User/UserSearch";

export default function Profile() {
  const [posts, setPosts] = useState();
  const { auth } = useAuth();
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    async function getPosts() {
      try {
        const response = await axiosPrivate.get(
          `/users/profile/${auth.username}`,
          {
            signal: controller.signal,
          }
        );

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
  }, []);

  return (
    <>
      <Posts posts={posts} />

      <UserSearch />
      <Follows />
    </>
  );
}
