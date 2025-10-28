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
      <div>
        <NavLink to={`/profile/${username}`} className={styles.links}>
          Profile
        </NavLink>
        <NavLink to={"/lists"} className={styles.links}>
          Lists
        </NavLink>
        <SearchLink className={styles.links}>Search</SearchLink>
        <NavLink to={"/feed"} className={styles.links}>
          Feed
        </NavLink>
        <button onClick={signOut} className={styles.logout}>
          Logout
        </button>
      </div>
    </div>
  );
}
