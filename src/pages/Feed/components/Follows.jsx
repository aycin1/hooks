import { useEffect, useState } from "react";
import UserLink from "../../../components/UserLink/UserLink";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import styles from "../Feed.module.css";

export default function Follows() {
  const axiosPrivate = useAxiosPrivate();
  const [users, setUsers] = useState([]);
  const [followCount, setFollowCount] = useState([]);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    async function getFollowers() {
      const response = await axiosPrivate.get(`/follows/follow-count`, {
        signal: controller.signal,
      });
      isMounted && setFollowCount(response.data);
    }
    getFollowers();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [axiosPrivate, users]);

  function mapUsers() {
    return Object.values(users).map((user) => {
      return <UserLink key={user} foundUser={user} />;
    });
  }

  function handleClick(e) {
    e.preventDefault();
    setUsers(followCount[e.target.value][e.target.name]);
  }

  function mapButtons(arr) {
    return arr?.map((obj, index) => {
      const name = Object.keys(obj)[0];
      const followArr = Object.values(obj)[0];
      return (
        <button
          key={index}
          name={name}
          value={index}
          onClick={handleClick}
          className={styles.followButton}
        >
          {followArr?.length ? followArr.length : 0} {name}
        </button>
      );
    });
  }

  return (
    <>
      <div className={styles.follows}>{mapButtons(followCount)}</div>
      <div className={styles.users}>{users && mapUsers()}</div>
    </>
  );
}
