import { NavLink } from "react-router";
import CreatePatterns from "../../../components/CreatePatterns/CreatePatterns";
import styles from "../Lists.module.css";

export default function CreateList({ list, listTitle }) {
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
    withLink: true,
  };

  return (
    <div className={styles.listCards}>
      <h2 className={styles.listTitle}>{listTitle}</h2>
      {list.length ? (
        <div className={styles.listCard}>
          <div className={styles.patternCards}>
            <CreatePatterns
              list={list}
              thumbnailOptions={thumbnailOptions}
              thumbnailOnly={false}
            />
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
