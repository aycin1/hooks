import { NavLink } from "react-router";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <div className={styles.header}>
      <div className={styles.name}>
        <NavLink to={"/"} className={styles.name}>
          Fibre fantasies
        </NavLink>
      </div>
      <div className={styles.linksContainer}>
        <NavLink to={"/profile"} className={styles.links}>
          Profile
        </NavLink>

        <NavLink to={"/lists"} className={styles.links}>
          Lists
        </NavLink>

        <NavLink to={"/search"} className={styles.links}>
          Search
        </NavLink>

        <NavLink to={"/feed"} className={styles.links}>
          Feed
        </NavLink>

        <NavLink to={"/logout"} className={styles.links}>
          Logout
        </NavLink>
      </div>
    </div>
  );
}
