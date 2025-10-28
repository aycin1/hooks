import Dropdown from "../../../components/Dropdown/Dropdown";
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
    <div className={styles.searchResults}>
      {list?.length
        ? list.map((pattern) => (
            <div className={styles.pattern} key={pattern.id}>
              <PatternCard
                patternID={pattern.id}
                thumbnailOptions={thumbnailOptions}
              />
              <Dropdown patternID={pattern.id} />
            </div>
          ))
        : "No patterns found, please try again"}
    </div>
  );
}
