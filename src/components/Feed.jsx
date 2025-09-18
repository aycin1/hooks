import { useEffect, useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import Posts from "./Posts/Posts";

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

  return <Posts posts={posts} />;
}
