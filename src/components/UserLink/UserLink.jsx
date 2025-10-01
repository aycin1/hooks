import { NavLink } from "react-router";
import useAuth from "../../hooks/useAuth";
import FollowButton from "../FollowButton/FollowButton";
import styles from "./UserLink.module.css";

export default function UserLink({ foundUser }) {
  const { auth } = useAuth();

  return (
    <div className={styles.userLink}>
      {foundUser === auth.username ? (
        <NavLink to="/profile">{foundUser}</NavLink>
      ) : (
        <>
          <NavLink to={`/user/${foundUser}`}>{foundUser}</NavLink>
          <FollowButton username={foundUser} />
        </>
      )}
    </div>
  );
}
