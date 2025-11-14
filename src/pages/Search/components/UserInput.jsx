import { useState } from "react";
import styles from "../Search.module.css";

export default function UserInput({ handleUserInput }) {
  const [searchField, setSearchField] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    searchField && handleUserInput(searchField?.split(" ")?.join("%20"));
  }

  return (
    <div className={styles.userInput}>
      <input
        aria-label="pattern search input field"
        className={styles.input}
        placeholder="Search for patterns!"
        value={searchField}
        onChange={(e) => setSearchField(e.target.value)}
      ></input>
      <button
        aria-label="button to search patterns"
        className={styles.searchButton}
        type="submit"
        onClick={handleSubmit}
      >
        Search
      </button>
    </div>
  );
}
