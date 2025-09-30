import PatternCard from "../PatternCard/PatternCard";
import styles from "./CreatePatterns.module.css";

export default function CreatePatterns({ list, thumbnailOptions }) {
  function mapLists() {
    return list.map((pattern) => {
      const patternID = pattern.pattern_id || pattern.id;
      return (
        <div key={patternID} className={styles.patternCard}>
          <PatternCard
            patternID={patternID}
            thumbnailOptions={thumbnailOptions}
            thumbnailOnly={false}
          />
        </div>
      );
    });
  }

  return list ? mapLists() : <p>Uh Oh</p>;
}
