import { useState } from "react";
import styles from "../Search.module.css";

export default function UserInput({ handleUserInput }) {
  const [searchField, setSearchField] = useState();

  function handleSubmit(e) {
    e.preventDefault();
    handleUserInput(searchField.split(" ").join("%20"));
  }

  return (
    <div className={styles.userInput}>
      <input
        className={styles.input}
        placeholder="Search for patterns!"
        onChange={(e) => setSearchField(e.target.value)}
      ></input>
      <button
        className={styles.searchButton}
        type="submit"
        onClick={handleSubmit}
      >
        Search
      </button>
    </div>
  );
}
