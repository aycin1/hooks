import { useEffect, useState } from "react";
import { axiosPrivate } from "../../api/axios";
import CreatePatterns from "../CreatePatterns";

export default function Search() {
  const [randomiser, setRandomiser] = useState();
  const [searchResults, setSearchResults] = useState();
  const [searchField, setSearchField] = useState();

  useEffect(() => {
    async function fetchRandoms() {
      const response = await axiosPrivate.get("/patterns/randomiser");
      response.data.splice(30);
      setRandomiser(response.data);
    }
    fetchRandoms();
  }, []);

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

  const thumbnailOptions = {
    urlSize: "medium_url",
    style: {
      width: "100%",
      height: "auto",
      maxWidth: "250px",
      minWidth: "250px",
      overflow: "hidden",
      margin: "-30px -10px -20px -20px",
    },
    maxHeight: "250px",
    withLink: true,
  };

  return (
    <div>
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <input
            className="input"
            placeholder="Search for patterns!"
            onChange={(e) => setSearchField(e.target.value)}
          ></input>
          <button className="searchButton">Search</button>
        </form>
      </div>
      <div className="resultsContainer">
        {searchResults ? (
          <CreatePatterns
            list={searchResults}
            thumbnailOptions={thumbnailOptions}
            thumbnailOnly={false}
          />
        ) : randomiser ? (
          <CreatePatterns
            list={randomiser}
            thumbnailOptions={thumbnailOptions}
            thumbnailOnly={false}
          />
        ) : (
          "Fetching patterns"
        )}
      </div>
    </div>
  );
}
