import { useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import PatternSelect from "./PatternSelect";
import UploadImage from "./UploadImage";

export default function CreatePostOverlay() {
  const axiosPrivate = useAxiosPrivate();
  const [chosenPattern, setChosenPattern] = useState(null);
  const [caption, setCaption] = useState("");
  const [message, setMessage] = useState("");
  const [imageUploadSuccess, setImageUploadSuccess] = useState(false);

  const uuid = useRef(uuidv4());

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
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {message && message}
      <PatternSelect
        chosenPattern={chosenPattern}
        handlePattern={handlePattern}
      />
      <UploadImage uuid={data.uuid} handleUploadSuccess={handleUploadSuccess} />
      <input
        type="text"
        placeholder="  Caption"
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
      ></input>
      <button
        type="submit"
        disabled={!imageUploadSuccess || !chosenPattern ? true : false}
      >
        Post
      </button>
    </form>
  );
}
