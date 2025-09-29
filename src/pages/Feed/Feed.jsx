import { useEffect, useState } from "react";
import CreatePost from "../../components/CreatePost/CreatePost";
import Posts from "../../components/Posts/Posts";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

export default function Feed() {
  const axiosPrivate = useAxiosPrivate();
  const [posts, setPosts] = useState();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    async function getPosts() {
      try {
        const response = await axiosPrivate.get("/feed", {
          signal: controller.signal,
        });
        isMounted && setPosts(response?.data?.searchPosts);
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
    </>
  );
}
