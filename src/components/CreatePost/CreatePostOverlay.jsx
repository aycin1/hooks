import { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
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

  useEffect(() => {
    openClick ? ref.current?.showModal() : ref.current?.close();
  }, [openClick]);

  const data = {
    pattern_id: chosenPattern,
    uuid: uuid.current,
    caption: caption,
  };

  function handlePattern(pattern) {
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
      window.parent.location = window.parent.location.href;
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <dialog ref={ref} onCancel={closeClick}>
      <button onClick={closeClick}>x</button>
      {message ? (
        message
      ) : (
        <form onSubmit={handleSubmit}>
          <PatternSelect
            chosenPattern={chosenPattern}
            handlePattern={handlePattern}
          />
          <UploadImage
            uuid={data.uuid}
            handleUploadSuccess={handleUploadSuccess}
          />
          <input
            type="text"
            placeholder="  Caption"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
          ></input>
          <button
            type="submit"
            disabled={!imageUploadSuccess || !chosenPattern ? true : false}
            className={styles.uploadPostButton}
          >
            Post
          </button>
        </form>
      )}
    </dialog>
  );
}
