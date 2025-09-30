import { useState } from "react";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

export default function PatternSearch({ setSearchResults }) {
  const [searchField, setSearchField] = useState();
  const axiosPrivate = useAxiosPrivate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await axiosPrivate.get(
        `/patterns/refine/query=${searchField}`
      );
      setSearchResults(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        className="input"
        placeholder="Search for patterns!"
        onChange={(e) => setSearchField(e.target.value)}
      ></input>
      <button className="searchButton">Search</button>
    </form>
  );
}
