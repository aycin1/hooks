import { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import useAuth from "../../hooks/useAuth";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import styles from "./CreatePost.module.css";
import PatternSelect from "./PatternSelect";
import UploadImage from "./UploadImage";

export default function CreatePostOverlay({ openClick, closeClick }) {
  const axiosPrivate = useAxiosPrivate();
  const [chosenPattern, setChosenPattern] = useState(null);
  const [caption, setCaption] = useState("");
  const [message, setMessage] = useState("");
  const [imageUploadSuccess, setImageUploadSuccess] = useState(false);
  const ref = useRef();
  const uuid = useRef(uuidv4());
  const { persist } = useAuth();

  useEffect(() => {
    openClick ? ref.current?.showModal() : ref.current?.close();
  }, [openClick]);

  const data = {
    pattern_id: parseInt(chosenPattern),
    uuid: uuid.current,
    caption: caption,
  };

  function handleClick(pattern) {
    setChosenPattern(pattern);
  }

  function handleUploadSuccess() {
    setImageUploadSuccess((oldVal) => !oldVal);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await axiosPrivate.post("/feed", data);
      setMessage(response?.data?.message);

      if (response.status === 201 && persist === true)
        window.parent.location = window.parent.location.href;
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <dialog ref={ref} onCancel={closeClick} className={styles.overlay}>
      <button
        onClick={closeClick}
        className={styles.closeOverlayBtn}
        aria-label="close overlay"
      >
        x
      </button>

      {message ? (
        message
      ) : (
        <form onSubmit={handleSubmit}>
          <div className={styles.patternSelectContainer}>
            <PatternSelect
              chosenPattern={chosenPattern}
              handleClick={handleClick}
            />
          </div>
          <div className={styles.bottomContainer}>
            <div className={styles.uploadImageContainer}>
              <UploadImage
                uuid={data.uuid}
                handleUploadSuccess={handleUploadSuccess}
              />
            </div>
            <div className={styles.captionAndPostBtn}>
              <input
                type="text"
                aria-label="caption"
                placeholder="Caption"
                value={caption}
                className={styles.caption}
                onChange={(e) => setCaption(e.target.value)}
              ></input>
              <button
                aria-label="submit"
                disabled={!imageUploadSuccess || !chosenPattern ? true : false}
                title="You must select a pattern and upload an image to create a post"
                className={styles.uploadPostButton}
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      )}
    </dialog>
  );
}
