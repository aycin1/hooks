import CreatePost from "../../components/CreatePost/CreatePost";
import Posts from "../../components/Posts/Posts";
import usePosts from "../../hooks/usePosts";

export default function Feed() {
  const posts = usePosts();

  return (
    <>
      <CreatePost />
      <Posts posts={posts} />
    </>
  );
}
