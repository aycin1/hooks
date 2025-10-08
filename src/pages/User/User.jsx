import { useParams } from "react-router";
import FollowButton from "../../components/FollowButton/FollowButton";
import Posts from "../../components/Posts/Posts";
import UserSearch from "../../components/UserSearch/UserSearch";
import usePosts from "../../hooks/usePosts";

export default function User() {
  const { username } = useParams();
  const posts = usePosts(username);

  return (
    <>
      <UserSearch />
      {username}
      <FollowButton username={username} />
      <Posts posts={posts} />
    </>
  );
}
