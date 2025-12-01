import UserSearch from "./../../components/UserSearch/UserSearch";
import Dashboard from "./components/Dashboard";
import styles from "./Home.module.css";

export default function Home() {
  return (
    <div className={styles.home}>
      <Dashboard />

      <div className={styles.userSearch}>
        <UserSearch />
      </div>
    </div>
  );
}
