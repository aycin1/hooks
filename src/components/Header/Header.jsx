import { NavLink } from "react-router";
import useAuth from "../../hooks/useAuth";
import styles from "./Header.module.css";

export default function Header() {
  const { auth } = useAuth();

  return (
    <div className={styles.header}>
      <NavLink to={"/"} className={styles.name}>
        Fibre fantasies
      </NavLink>
      <div>
        <NavLink to={`/profile/${auth.username}`} className={styles.links}>
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
