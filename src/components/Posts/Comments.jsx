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
    let isMounted = true;
    const controller = new AbortController();

    async function fetchComments() {
      try {
        const response = await axiosPrivate.get(`/comments/${postID}`, {
          signal: controller.signal,
        });
        isMounted && setComments(response?.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchComments();
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [postID, message, axiosPrivate]);

  async function handleCommentDeletion(e) {
    const data = { post_id: postID, message: e.target.value };
    try {
      const response = await axiosPrivate.delete("/comments/", { data });
      setMessage(response?.data?.message);
    } catch (error) {
      console.log(error);
    }
  }

  function mapComments() {
    return comments.map((comment, index) => {
      return (
        <div key={index}>
          <p>{comment.message}</p>
          <Link to={`/profile/${comment.comment_username}`}>
            {comment.comment_username}
          </Link>

          {comment.comment_username === auth.username && (
            <button
              value={comment.message}
              onClick={(e) => handleCommentDeletion(e)}
            >
              delete
            </button>
          )}
        </div>
      );
    });
  }

  return (
    <div>
      <div>{comments?.length > 0 && mapComments()}</div>
      <div>{message && message}</div>
      <AddComment postID={postID} setMessage={setMessage} />
    </div>
  );
}
