import { useEffect, useState } from "react";
import { useParams } from "react-router";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import Posts from "../Posts/Posts";
import FollowButton from "./FollowButton";
import UserSearch from "./UserSearch";

export default function User() {
  const { username } = useParams();
  const [posts, setPosts] = useState();
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    async function getPosts() {
      try {
        const response = await axiosPrivate.get(`/users/posts/${username}`, {
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
      <UserSearch />
      {username}
      <FollowButton username={username} />
      <Posts posts={posts} />
    </>
  );
}
