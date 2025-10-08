import { useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import SelectPattern from "./SelectPattern";
import UploadImage from "./UploadImage";

export default function CreatePostOverlay({ isClicked }) {
  const axiosPrivate = useAxiosPrivate();
  const [chosenPatternID, setChosenPatternID] = useState(null);
  const [caption, setCaption] = useState("");
  const [message, setMessage] = useState("");
  const [isPosted, setIsPosted] = useState(false);
  const [imageUploadSuccess, setImageUploadSuccess] = useState(false);

  const uuid = useRef(uuidv4());

  const data = {
    pattern_id: chosenPatternID,
    uuid: uuid.current,
    caption: caption,
  };

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await axiosPrivate.post("/feed", data);
      response?.status === 201
        ? (setMessage(response?.data?.message), setIsPosted(true))
        : setMessage(response?.data?.message);
    } catch (error) {
      console.log(error);
    }
  }

  return isPosted ? (
    <h4>{message}</h4>
  ) : (
    <form onSubmit={handleSubmit} className="createPostForm">
      {message ? message : null}
      {!chosenPatternID ? (
        <>
          <p style={{ fontSize: "12pt" }}>
            Select a pattern (from your lists) to link your post to
          </p>

          <SelectPattern
            isClicked={isClicked}
            setChosenPatternID={setChosenPatternID}
          />
        </>
      ) : (
        <button onClick={() => setChosenPatternID(null)}>
          back to pattern selection
        </button>
      )}
      <UploadImage
        uuid={data.uuid}
        setImageUploadSuccess={setImageUploadSuccess}
      />
      <input
        type="text"
        placeholder="  Caption"
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
      ></input>

      <button
        type="submit"
        disabled={!imageUploadSuccess || !chosenPatternID ? true : false}
      >
        Post
      </button>
    </form>
  );
}
