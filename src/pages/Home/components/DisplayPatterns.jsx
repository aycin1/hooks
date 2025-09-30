import { NavLink } from "react-router";
import CreatePatterns from "../../../components/CreatePatterns/CreatePatterns";
import useLists from "../../../hooks/useLists";
import styles from "../Home.module.css";

export default function DisplayPatterns({ chosenList }) {
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
    withLink: true,
  };

  return (
    <div className={styles.list}>
      <div className={styles.patterns}>
        <CreatePatterns
          list={lists[chosenList]}
          thumbnailOptions={thumbnailOptions}
          thumbnailOnly={false}
        />
      </div>
      <NavLink to="/search" className={styles.link}>
        add patterns here
      </NavLink>
    </div>
  );
}
