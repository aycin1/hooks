import { useEffect, useState } from "react";
import CreatePost from "../../components/CreatePost/CreatePost";
import Posts from "../../components/Posts/Posts";
import UserSearch from "../../components/UserSearch/UserSearch";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import Follows from "./components/Follows";

export default function Profile() {
  const [posts, setPosts] = useState();
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
  }, []);

  return (
    <>
      <CreatePost />
      <Posts posts={posts} />
      <UserSearch />
      <Follows />
    </>
  );
}
