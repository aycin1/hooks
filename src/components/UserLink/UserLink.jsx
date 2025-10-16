import { NavLink } from "react-router";
import useUsername from "../../hooks/useUsername";
import FollowButton from "../FollowButton/FollowButton";
import styles from "./UserLink.module.css";

export default function UserLink({ foundUser }) {
  const thisUser = useUsername();

  return (
    <div className={styles.userLink}>
      <NavLink to={`/profile/${foundUser}`}>{foundUser}</NavLink>
      {foundUser !== thisUser && <FollowButton username={foundUser} />}
    </div>
  );
}
