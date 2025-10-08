import { useEffect, useState } from "react";
import { axiosPrivate } from "../../api/axios";
import RefineSearch from "./components/RefineSearch";
import SearchResults from "./components/SearchResults";
import UserInput from "./components/UserInput";
import styles from "./Search.module.css";

export default function Search() {
  const [userInput, setUserInput] = useState();
  const [refineOptions, setRefineOptions] = useState([]);
  const [searchResults, setSearchResults] = useState();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    async function fetchResults() {
      try {
        const params = [refineOptions, { name: "query", value: userInput }];

        let searchParams = {};
        params
          .flatMap((param) => param)
          .map((param) =>
            param.value ? (searchParams[param.name] = param.value) : ""
          );

        const query = new URLSearchParams(searchParams);
        const response = await axiosPrivate.get(`/patterns/refine/?${query}`, {
          signal: controller.signal,
        });

        isMounted && setSearchResults(response?.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchResults();
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [refineOptions, userInput]);

  return (
    <div className={styles.searchPage}>
      <div className={styles.refine}>
        <RefineSearch setRefineOptions={setRefineOptions} />
      </div>
      <div>
        <UserInput setUserInput={setUserInput} />
        <div className={styles.searchResults}>
          {searchResults && <SearchResults list={searchResults} />}
        </div>
      </div>
    </div>
  );
}
