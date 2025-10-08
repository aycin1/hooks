import { useEffect, useState } from "react";
import UserLink from "../../../components/UserLink/UserLink";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import styles from "../Profile.module.css";

export default function Follows() {
  const axiosPrivate = useAxiosPrivate();
  const [users, setUsers] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    async function getFollowers() {
      const response = await axiosPrivate.get(`/follows/follow-count`, {
        signal: controller.signal,
      });
      isMounted && setFollowers(response.data.followers);
      isMounted && setFollowing(response.data.following);
    }
    getFollowers();
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [axiosPrivate]);

  const followersArr = followers?.map((follows) => follows.username);
  const followingArr = following?.map((follows) => follows.following_user);
  const follows = { followers: followersArr, following: followingArr };

  async function handleSubmit(e) {
    e.preventDefault();
    setUsers(follows[e.target.name]);
  }

  function mapUsers() {
    return Object.values(users).map((user) => {
      return <UserLink key={user} foundUser={user} />;
    });
  }

  return (
    <div>
      <div className={styles.follows}>
        <form name="followers" onSubmit={handleSubmit}>
          <button className={styles.followers} type="submit">
            {followers?.length ? followers.length : 0} followers
          </button>
        </form>
        <form name="following" onSubmit={handleSubmit}>
          <button className={styles.following} type="submit">
            {following?.length ? following.length : 0} following
          </button>
        </form>
      </div>
      <div className={styles.users}>{users ? mapUsers() : ""}</div>
    </div>
  );
}
