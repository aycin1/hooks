import { NavLink, useNavigate } from "react-router";
import useLogout from "../../hooks/useLogout";
import useUsername from "../../hooks/useUsername";
import SearchLink from "../SearchLink/SearchLink";
import styles from "./Header.module.css";

export default function Header() {
  const navigate = useNavigate();
  const logout = useLogout();
  const username = useUsername();

  async function signOut() {
    await logout();
    navigate("/login");
  }

  return (
    <div className={styles.header}>
      <NavLink to={"/"} className={styles.name}>
        Fibre fantasies
      </NavLink>
      <div className={styles.links}>
        <NavLink
          to={username && `/profile/${username}`}
          className={styles.link}
        >
          Profile
        </NavLink>
        <NavLink to={"/lists"} className={styles.link}>
          Lists
        </NavLink>
        <SearchLink className={styles.link}>Search</SearchLink>
        <NavLink to={"/feed"} className={styles.link}>
          Feed
        </NavLink>
        <button onClick={signOut} className={`${styles.logout} ${styles.link}`}>
          Logout
        </button>
      </div>
    </div>
  );
}
