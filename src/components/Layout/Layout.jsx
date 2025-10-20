import { Outlet } from "react-router";
import Header from "../Header/Header";
import styles from "./Layout.module.css";

export default function Layout() {
  return (
    <div className={styles.app}>
      <div className={styles.header}>
        <Header />
      </div>
      <div className={styles.outlet}>
        <Outlet />
      </div>
    </div>
  );
}
