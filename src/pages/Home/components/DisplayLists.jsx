import { NavLink } from "react-router";
import Dropdown from "../../../components/Dropdown/Dropdown";
import PatternCard from "../../../components/PatternCard/PatternCard";
import useLists from "../../../hooks/useLists";
import styles from "../Home.module.css";

export default function DisplayLists({ chosenList }) {
  const lists = useLists();
  const thumbnailOptions = {
    urlSize: "medium_url",
    style: {
      width: "100%",
      height: "auto",
      maxWidth: "150px",
      minWidth: "150px",
      overflow: "hidden",
    },
    maxHeight: "150px",
  };

  return (
    <div className={styles.list}>
      <div className={styles.patterns}>
        {lists?.[chosenList]?.length > 0 &&
          lists[chosenList].map((pattern) => (
            <div key={pattern.pattern_id}>
              <PatternCard
                patternID={pattern.pattern_id}
                thumbnailOptions={thumbnailOptions}
              />
              <Dropdown patternID={pattern.pattern_id} />
            </div>
          ))}
      </div>
      <NavLink to="/search" className={styles.link}>
        add patterns here
      </NavLink>
    </div>
  );
}
