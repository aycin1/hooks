import { Link } from "react-router";
import useAuth from "../../hooks/useAuth";
import FollowButton from "./FollowButton";

export default function UserLink({ foundUser }) {
  const { auth } = useAuth();

  return (
    <div className="userLinkContainer">
      {foundUser === auth.username ? (
        <Link to="/profile">{foundUser}</Link>
      ) : (
        <>
          <Link to={`/user/${foundUser}`}>{foundUser}</Link>
          <FollowButton username={foundUser} />
        </>
      )}
    </div>
  );
}
