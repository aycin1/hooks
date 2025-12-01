import useLists from "../../hooks/useLists";
import Thumbnail from "../Thumbnail/Thumbnail";
import styles from "./CreatePost.module.css";

export default function PatternSelect({ chosenPattern, handleClick }) {
  const { lists } = useLists();

  const thumbnailOptions = {
    urlSize: "small_url",
    style: { width: "80px", height: "auto" },
    maxHeight: "80px",
  };

  function displayPattern(pattern) {
    return (
      <div
        key={pattern}
        onClick={() => handleClick(pattern)}
        className={
          parseInt(pattern) === parseInt(chosenPattern)
            ? styles.chosen
            : styles.thumbnail
        }
      >
        <Thumbnail thumbnailOptions={thumbnailOptions} patternID={pattern} />
      </div>
    );
  }

  return (
    <>
      <p className={styles.p}>
        {!chosenPattern
          ? "Select a pattern from your lists to post..."
          : "...and show your friends your creation!"}
      </p>
      <div className={styles.displayPatterns}>
        {lists &&
          Object.values(lists)
            .flatMap((list) => list.patterns)
            .map((pattern) => displayPattern(pattern.pattern_id))}
      </div>
    </>
  );
}
