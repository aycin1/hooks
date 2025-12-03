import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import styles from "../Search.module.css";

export default function UserInput({ handleUserInput }) {
  const [searchField, setSearchField] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    searchField && handleUserInput(searchField?.split(" ")?.join("%20"));
  }

  return (
    <form className={styles.userInput} onSubmit={handleSubmit}>
      <input
        aria-label="pattern search input field"
        className={styles.input}
        placeholder="Looking for something specific?"
        value={searchField}
        onChange={(e) => setSearchField(e.target.value)}
      ></input>
      <button
        aria-label="button to search patterns"
        className={styles.searchButton}
        type="submit"
      >
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </button>
    </form>
  );
}
