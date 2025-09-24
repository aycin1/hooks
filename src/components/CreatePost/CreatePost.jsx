import { useState } from "react";
import CreatePostOverlay from "./CreatePostOverlay";

export default function CreatePost() {
  const [isClicked, setIsClicked] = useState(false);

  function handleClick() {
    return setIsClicked((oldValue) => !oldValue);
  }

  return (
    <div className="createPostContainer">
      <button className="createPostButton" onClick={() => handleClick()}>
        {isClicked ? "x" : "Add a post"}
      </button>
      <div className="">
        {isClicked ? <CreatePostOverlay isClicked={isClicked} /> : ""}
      </div>
    </div>
  );
}
