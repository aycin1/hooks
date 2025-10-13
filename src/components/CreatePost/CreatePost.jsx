import { useState } from "react";
import CreatePostOverlay from "./CreatePostOverlay";

export default function CreatePost() {
  const [isClicked, setIsClicked] = useState(false);
  return (
    <div>
      <button onClick={() => setIsClicked((oldValue) => !oldValue)}>
        {isClicked ? "x" : "add a post!"}
      </button>
      {isClicked && <CreatePostOverlay />}
    </div>
  );
}
