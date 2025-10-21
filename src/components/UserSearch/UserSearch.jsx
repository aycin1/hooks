import { useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import UserLink from "../UserLink/UserLink";
import styles from "./UserSearch.module.css";

export default function UserSearch() {
  const [searchField, setSearchField] = useState();
  const [foundUser, setFoundUser] = useState();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const axiosPrivate = useAxiosPrivate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await axiosPrivate.get(`/users/search/${searchField}`);
      setFoundUser(response.data.username);
    } catch (error) {
      console.log(error);
    }
    setIsSubmitted(true);
  }

  return (
    <div className={styles.userSearch}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          className={styles.input}
          type="text"
          value={searchField}
          placeholder="Search for your friends!"
          onChange={(e) => setSearchField(e.target.value)}
        />
        <button className={styles.button}>Search</button>
      </form>
      <div className={styles.foundUser}>
        {foundUser ? (
          <UserLink foundUser={foundUser} />
        ) : isSubmitted ? (
          "No users found"
        ) : null}
      </div>
    </div>
  );
}
