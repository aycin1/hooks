import Dropdown from "../../../components/Dropdown/Dropdown";
import PatternCard from "../../../components/PatternCard/PatternCard";
import SearchLink from "../../../components/SearchLink/SearchLink";
import useLists from "../../../hooks/useLists";
import styles from "../Lists.module.css";

export default function List({ listTitle }) {
  const lists = useLists();
  const list =
    lists &&
    Object.values(lists).filter((list) => list.name === listTitle)[0]?.patterns;

  const thumbnailOptions = {
    urlSize: "medium_url",
    style: {
      width: "100%",
      height: "auto",
      maxWidth: "120px",
      minWidth: "120px",
      overflow: "hidden",
    },
    maxHeight: "120px",
  };

  return (
    <div className={styles.listCards}>
      <h2 className={styles.listTitle}>{listTitle}</h2>
      {list?.length ? (
        <div className={styles.listCard}>
          <div className={styles.patternCards}>
            {list?.map((pattern) => (
              <div key={pattern.pattern_id} className={styles.pattern}>
                <PatternCard
                  patternID={pattern.pattern_id}
                  thumbnailOptions={thumbnailOptions}
                />
                <div className={styles.dropdown}>
                  <Dropdown patternID={pattern.pattern_id} />
                </div>
              </div>
            ))}
          </div>
          <SearchLink className={styles.searchLink}>
            add more patterns!
          </SearchLink>
        </div>
      ) : (
        <SearchLink>
          this list is empty, click here to search patterns!
        </SearchLink>
      )}
    </div>
  );
}
