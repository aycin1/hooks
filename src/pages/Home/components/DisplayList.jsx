import Dropdown from "../../../components/Dropdown/Dropdown";
import PatternCard from "../../../components/PatternCard/PatternCard";
import SearchLink from "../../../components/SearchLink/SearchLink";
import useLists from "../../../hooks/useLists";
import styles from "../Home.module.css";

export default function DisplayList({ chosenList }) {
  const lists = useLists();
  const thumbnailOptions = {
    urlSize: "medium_url",
    style: {
      maxWidth: "150px",
      minWidth: "150px",
      overflow: "hidden",
    },
    maxHeight: "150px",
  };

  const chosenListContents =
    lists && Object.values(lists).find((list) => list.name === chosenList);

  return (
    <div className={styles.list}>
      <div className={styles.patterns}>
        {chosenListContents?.patterns?.length > 0 &&
          chosenListContents?.patterns.map((pattern) => (
            <div key={pattern.pattern_id} className={styles.patternCard}>
              <div className={styles.dropdown}>
                <Dropdown patternID={pattern.pattern_id} />
              </div>
              <PatternCard
                patternID={pattern.pattern_id}
                thumbnailOptions={thumbnailOptions}
              />
            </div>
          ))}
      </div>

      <SearchLink className={styles.link}>add patterns here</SearchLink>
    </div>
  );
}
