import CreatePatterns from "../../../components/CreatePatterns/CreatePatterns";
import styles from "../Search.module.css";

export default function SearchResults({ list }) {
  const thumbnailOptions = {
    urlSize: "medium_url",
    style: {
      width: "100%",
      height: "auto",
      maxWidth: "200px",
      minWidth: "200px",
      overflow: "hidden",
      padding: "10px",
    },
    maxHeight: "200px",
  };

  return (
    <div className={styles.patterns}>
      {list?.length ? (
        <CreatePatterns list={list} thumbnailOptions={thumbnailOptions} />
      ) : (
        "No patterns found, please try again"
      )}
    </div>
  );
}
