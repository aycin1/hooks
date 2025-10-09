import { NavLink } from "react-router";
import useAuth from "../../hooks/useAuth";
import FollowButton from "../FollowButton/FollowButton";
import styles from "./UserLink.module.css";

export default function UserLink({ foundUser }) {
  const { auth } = useAuth();

  return (
    <div className={styles.userLink}>
      <NavLink to={`/profile/${foundUser}`}>{foundUser}</NavLink>
      {foundUser !== auth.username && <FollowButton username={foundUser} />}
    </div>
  );
}
