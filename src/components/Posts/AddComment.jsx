import { useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

export default function AddComment({ postID, handleChange }) {
  const axiosPrivate = useAxiosPrivate();
  const [comment, setComment] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    const data = { post_id: postID, message: comment };
    try {
      const response = await axiosPrivate.post("/comments", data);
      handleChange(response?.data?.message);
      setComment("");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label type="submit">
        <input
          className="commentInput"
          placeholder="Comment..."
          onChange={(e) => setComment(e.target.value)}
          value={comment}
        ></input>
      </label>
    </form>
  );
}
