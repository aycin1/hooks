import useUsername from "../../hooks/useUsername";
import UserSearch from "./../../components/UserSearch/UserSearch";
import Dashboard from "./components/Dashboard";
import styles from "./Home.module.css";

export default function Home() {
  const username = useUsername();

  return (
    <div className={styles.home}>
      <h2 className={styles.heading}>Welcome, {username}!</h2>
      <Dashboard />

      <div className={styles.userSearch}>
        <UserSearch />
      </div>
    </div>
  );
}
