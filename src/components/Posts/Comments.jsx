import { useEffect, useState } from "react";
import { Link } from "react-router";
import useAuth from "../../hooks/useAuth";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import AddComment from "./AddComment";

export default function Comments({ postID }) {
  const { auth } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const [comments, setComments] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function fetchComments() {
      const response = await axiosPrivate.get(`/comments/${postID}`);
      setComments(response?.data);
    }
    fetchComments();
  }, [postID, message]);

  async function handleCommentDeletion(e) {
    const data = { post_id: postID, message: e.target.value };
    const response = await axiosPrivate.delete("/comments/", { data });
    setMessage(response?.data?.message);
  }

  function mapComments() {
    return comments.map((comment, index) => {
      return (
        <div key={index} className="commentContainer">
          <p>{comment.message}</p>
          <Link to={`/user/${comment.comment_username}`}>
            {comment.comment_username}
          </Link>

          {comment.comment_username === auth.username ? (
            <button
              value={comment.message}
              className="deleteCommentButton"
              onClick={(e) => handleCommentDeletion(e)}
            >
              delete
            </button>
          ) : (
            ""
          )}
        </div>
      );
    });
  }

  return (
    <div>
      <div>{comments?.length ? mapComments() : ""}</div>
      <div>{message ? message : null}</div>
      <AddComment postID={postID} setMessage={setMessage} />
    </div>
  );
}
