import { useEffect, useState } from "react";
import { axiosPrivate } from "../../api/axios";
import CreatePatterns from "../../components/CreatePatterns/CreatePatterns";
import PatternSearch from "./components/PatternSearch";
import RefineSearch from "./components/RefineSearch";
import styles from "./Search.module.css";

export default function Search() {
  const [randomiser, setRandomiser] = useState();
  const [searchResults, setSearchResults] = useState();
  const [refineOptions, setRefineOptions] = useState([]);

  useEffect(() => {
    async function fetchRandoms() {
      const response = await axiosPrivate.get("/patterns/randomiser");
      response.data.splice(30);
      setRandomiser(response.data);
    }
    fetchRandoms();
  }, []);

  const thumbnailOptions = {
    urlSize: "medium_url",
    style: {
      width: "100%",
      height: "auto",
      maxWidth: "200px",
      minHeight: "200px",
      minWidth: "200px",
      overflow: "hidden",
      padding: "10px",
    },
    maxHeight: "200px",
    withLink: true,
  };

  return (
    <>
      <RefineSearch setRefineOptions={setRefineOptions} />
      <PatternSearch
        setSearchResults={setSearchResults}
        refineOptions={refineOptions}
      />
      <div className={styles.searchResults}>
        {searchResults ? (
          <div className={styles.patterns}>
            <CreatePatterns
              list={searchResults}
              thumbnailOptions={thumbnailOptions}
              thumbnailOnly={false}
            />
          </div>
        ) : randomiser ? (
          <div className={styles.patterns}>
            <CreatePatterns
              list={randomiser}
              thumbnailOptions={thumbnailOptions}
              thumbnailOnly={false}
            />
          </div>
        ) : (
          "Fetching patterns"
        )}
      </div>
    </>
  );
}
