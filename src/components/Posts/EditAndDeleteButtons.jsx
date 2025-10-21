import { faPencil, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
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
      if (response.status === 200) {
        window.location.href = parent.window.location;
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
      console.log(response);
      if (response.status === 200) {
        window.location.href = parent.window.location;
      }
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
          <button
            className={styles.editPostButton}
            onClick={toggleInputField}
            title="Edit caption"
          >
            <FontAwesomeIcon icon={faPencil} size="sm" />
          </button>
          <button
            value={postID}
            className={styles.deletePostButton}
            onClick={handleDeletion}
            title="Delete post"
          >
            <FontAwesomeIcon icon={faTrashCan} size="sm" />
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
