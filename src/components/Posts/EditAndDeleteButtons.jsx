import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import styles from "./Posts.module.css";

export default function EditAndDeleteButtons({
  postID,
  currentCaption,
  msgChange,
}) {
  const axiosPrivate = useAxiosPrivate();
  const [caption, setCaption] = useState("");
  const [showInput, setShowInput] = useState(false);

  function handleMessageChange(msg) {
    msgChange(msg);
  }

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
      handleMessageChange(response?.data?.message);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleDeletion() {
    const data = { post_id: postID };
    try {
      const response = await axiosPrivate.delete("/feed/", { data });
      handleMessageChange(response?.data?.message);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className={styles.editAndDeleteButtons}>
      <form onSubmit={handleCaptionChange}>
        {showInput && (
          <input
            type="text"
            placeholder={currentCaption || "edit caption..."}
            onChange={(e) => setCaption(e.target.value)}
          ></input>
        )}
      </form>
      {!showInput ? (
        <>
          <button className={styles.editPostButton} onClick={toggleInputField}>
            <FontAwesomeIcon icon={faPencil} size="sm" />
          </button>
          <button
            value={postID}
            className={styles.deletePostButton}
            onClick={handleDeletion}
          >
            <FontAwesomeIcon icon={faTrash} size="sm" />
          </button>
        </>
      ) : (
        <button className={styles.toggleInputButton} onClick={toggleInputField}>
          x
        </button>
      )}
    </div>
  );
}
