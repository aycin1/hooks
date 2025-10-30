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
      const response = await axiosPrivate.get(`/follows/count`, {
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
      return Object.entries(obj).map(([key, value]) => (
        <button
          key={index}
          name={key}
          value={index}
          onClick={handleClick}
          className={styles.followButton}
        >
          {value?.length ? value.length : 0} {key}
        </button>
      ));
    });
  }

  return (
    <>
      <div className={styles.follows}>
        {followCount.length > 0 && mapButtons(followCount)}
      </div>
      <div className={styles.users}>{users && mapUsers()}</div>
    </>
  );
}
