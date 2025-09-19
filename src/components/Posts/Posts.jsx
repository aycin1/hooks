import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import Post from "./Post";

export default function Posts({ posts }) {
  const { auth } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const [caption, setCaption] = useState("");
  const [showInput, setShowInput] = useState(false);

  function toggleInputField() {
    return setShowInput((oldValue) => !oldValue);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const body = {
      post_id: e.target.name,
      caption: caption,
    };
    await axiosPrivate.put("/feed", body);
  }

  async function handleClick(e) {
    e.preventDefault();
    const body = { post_id: e.target.value };
    axiosPrivate.delete("/feed", body);
  }

  function mapPosts() {
    if (posts?.length) {
      return posts.map((post) => (
        <div key={post.post_id} className="post">
          <Post post={post} />
          <form onSubmit={handleSubmit} name={post.post_id}>
            {showInput ? (
              <input
                type="text"
                onChange={(e) => setCaption(e.target.value)}
              ></input>
            ) : (
              ""
            )}
            {post.username === auth.username ? (
              <button
                className="editPostButton"
                onClick={(e) => toggleInputField(e)}
              >
                edit
              </button>
            ) : (
              ""
            )}
          </form>
          {post.username === auth.username ? (
            <button
              className="deletePostButton"
              value={post.post_id}
              onClick={(e) => handleClick(e)}
            >
              x
            </button>
          ) : (
            ""
          )}
        </div>
      ));
    } else {
      // return "No posts";
    }
  }
  return <div className="posts">{mapPosts()}</div>;
}
