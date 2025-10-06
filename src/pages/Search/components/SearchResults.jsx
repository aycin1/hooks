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
    withLink: true,
  };

  return (
    <div className={styles.patterns}>
      <CreatePatterns
        list={list}
        thumbnailOptions={thumbnailOptions}
        thumbnailOnly={false}
      />
    </div>
  );
}
