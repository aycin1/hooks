import { useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

export default function AddComment({ postID, setMessage }) {
  const axiosPrivate = useAxiosPrivate();
  const [comment, setComment] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    const data = { post_id: postID, message: comment };
    const response = await axiosPrivate.post("/comments", data);
    setMessage(response?.data?.message);
  }

  return (
    <form onSubmit={handleSubmit}>
      <label type="submit">
        <input
          className="commentInput"
          placeholder="Comment..."
          onChange={(e) => setComment(e.target.value)}
        ></input>
      </label>
    </form>
  );
}
