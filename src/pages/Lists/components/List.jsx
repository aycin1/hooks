import { NavLink } from "react-router";
import PatternCard from "../../../components/PatternCard/PatternCard";
import RenderDropdown from "../../../components/RenderDropdown/RenderDropdown";
import styles from "../Lists.module.css";

export default function List({ list, listTitle }) {
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
      {list.length ? (
        <div className={styles.listCard}>
          <div className={styles.patternCards}>
            {list.map((pattern) => (
              <div>
                <PatternCard
                  patternID={pattern.pattern_id}
                  thumbnailOptions={thumbnailOptions}
                />
                <RenderDropdown patternID={pattern.pattern_id} />
              </div>
            ))}
          </div>
          <NavLink to="/search" className={styles.searchLink}>
            add more patterns!
          </NavLink>
        </div>
      ) : (
        <NavLink to="/search">
          this list is empty, click here to search patterns!
        </NavLink>
      )}
    </div>
  );
}
