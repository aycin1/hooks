import PatternCard from "../../../components/PatternCard/PatternCard";
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
      {list?.length
        ? list.map((pattern) => (
            <PatternCard
              patternID={pattern.id}
              thumbnailOptions={thumbnailOptions}
            />
          ))
        : "No patterns found, please try again"}
    </div>
  );
}
