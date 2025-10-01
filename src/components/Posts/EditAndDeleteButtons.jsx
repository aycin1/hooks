import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import styles from "./Posts.module.css";

export default function EditAndDeleteButtons({
  username,
  postID,
  currentCaption,
}) {
  const { auth } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const [caption, setCaption] = useState("");
  const [showInput, setShowInput] = useState(false);

  function toggleInputField() {
    return setShowInput((oldValue) => !oldValue);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const data = {
      post_id: e.target.name,
      caption: caption,
    };
    try {
      await axiosPrivate.put("/feed", data);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleClick(e) {
    e.preventDefault();
    const data = { post_id: e.target.value };
    try {
      await axiosPrivate.delete("/feed", { data });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className={styles.editAndDeleteButtons}>
      <form onSubmit={handleSubmit}>
        {showInput ? (
          <input
            type="text"
            placeholder={currentCaption || "edit caption..."}
            onChange={(e) => setCaption(e.target.value)}
          ></input>
        ) : (
          ""
        )}
        {username === auth.username && !showInput ? (
          <button
            className={styles.editPostButton}
            onClick={(e) => toggleInputField(e)}
          >
            <FontAwesomeIcon icon={faPencil} size="sm" />
          </button>
        ) : (
          <button
            className={styles.toggleInputButton}
            onClick={(e) => toggleInputField(e)}
          >
            x
          </button>
        )}
      </form>
      {username === auth.username ? (
        <button
          value={postID}
          className={styles.deletePostButton}
          onClick={(e) => handleClick(e)}
        >
          <FontAwesomeIcon icon={faTrash} size="sm" />
        </button>
      ) : (
        ""
      )}
    </div>
  );
}
