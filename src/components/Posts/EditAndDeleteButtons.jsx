import { faPencil, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import styles from "./Posts.module.css";

export default function EditAndDeleteButtons({
  postID,
  currentCaption,
  handleChange,
}) {
  const axiosPrivate = useAxiosPrivate();
  const [caption, setCaption] = useState("");
  const [showInput, setShowInput] = useState(false);
  const { persist } = useAuth();

  function toggleInputField() {
    return setShowInput((oldValue) => !oldValue);
  }

  async function handleCaptionChange(e) {
    e.preventDefault();
    const data = {
      post_id: postID,
      caption: caption,
    };
    try {
      const response = await axiosPrivate.put("/feed/", data);
      handleChange(response?.data?.message);
      if (response.status === 200 && persist === true) {
        window.parent.location = window.parent.location.href;
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function handleDeletion() {
    const data = { post_id: postID };
    try {
      const response = await axiosPrivate.delete("/feed/", { data });
      handleChange(response?.data?.message);

      if (response.status === 200 && persist === true) {
        window.parent.location = window.parent.location.href;
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className={styles.editAndDeleteButtons}>
      {showInput && (
        <form onSubmit={handleCaptionChange}>
          <input
            aria-label="input for caption change"
            type="text"
            placeholder={currentCaption || "edit caption..."}
            onChange={(e) => setCaption(e.target.value)}
          ></input>
        </form>
      )}

      {!showInput ? (
        <>
          <button
            aria-label="edit caption"
            className={styles.editPostButton}
            onClick={toggleInputField}
            title="Edit caption"
          >
            <FontAwesomeIcon icon={faPencil} size="sm" />
          </button>
          <button
            aria-label="delete post"
            value={postID}
            className={styles.deletePostButton}
            onClick={handleDeletion}
            title="Delete post"
          >
            <FontAwesomeIcon icon={faTrashCan} size="sm" />
          </button>
        </>
      ) : (
        <button
          aria-label="close input field"
          className={styles.toggleInputButton}
          onClick={toggleInputField}
        >
          x
        </button>
      )}
    </div>
  );
}
