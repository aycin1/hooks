import { useState } from "react";

export default function PatternSearch({ setUserInput }) {
  const [searchField, setSearchField] = useState();

  function handleSubmit(e) {
    e.preventDefault();
    setUserInput(searchField.split(" ").join("-"));
  }

  return (
    <>
      <input
        className="input"
        placeholder="Search for patterns!"
        onChange={(e) => setSearchField(e.target.value)}
      ></input>
      <button className="searchButton" type="submit" onClick={handleSubmit}>
        Search
      </button>
    </>
  );
}
