import { faSquareXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useUsername from "../../hooks/useUsername";
import AddComment from "./AddComment";
import styles from "./Posts.module.css";

export default function Comments({ postID }) {
  const axiosPrivate = useAxiosPrivate();
  const [comments, setComments] = useState([]);
  const [message, setMessage] = useState("");
  const thisUser = useUsername();

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

  function handleChange(msg) {
    setMessage(msg);
  }

  async function handleCommentDeletion(msg) {
    const data = { post_id: postID, message: msg };
    try {
      const response = await axiosPrivate.delete("/comments/", { data });
      handleChange(response?.data?.message);
    } catch (error) {
      console.error(error);
    }
  }

  function mapComments() {
    return comments.map((comment, index) => {
      return (
        <div key={index} className={styles.comments}>
          <p>{comment.message}</p>
          <div>
            <Link to={`/profile/${comment.comment_username}`}>
              {comment.comment_username}
            </Link>

            {comment.comment_username === thisUser && (
              <button
                onClick={() => handleCommentDeletion(comment.message)}
                className={styles.deleteCommentButton}
                title="Delete comment"
              >
                <FontAwesomeIcon
                  icon={faSquareXmark}
                  style={{ color: "#114e09" }}
                />
              </button>
            )}
          </div>
        </div>
      );
    });
  }

  return (
    <div>
      {comments?.length > 0 && mapComments()}
      <AddComment postID={postID} handleChange={handleChange} />
    </div>
  );
}
