import { useEffect, useState } from "react";
import useAxiosPrivate from "./useAxiosPrivate";
export default function usePosts(username) {
  const [posts, setPosts] = useState();
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    async function getPosts() {
      try {
        let response;
        if (username) {
          const query = new URLSearchParams({ username: username });
          response = await axiosPrivate.get(`/users/?${query}`, {
            signal: controller.signal,
          });
        } else {
          response = await axiosPrivate.get("/feed", {
            signal: controller.signal,
          });
        }
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
  }, [username, axiosPrivate]);

  return posts;
}
