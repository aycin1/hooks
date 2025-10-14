import { useEffect, useState } from "react";
import { axiosPrivate } from "../../api/axios";
import RefineSearch from "./components/RefineSearch";
import SearchResults from "./components/SearchResults";
import Toggle from "./components/Toggle";
import UserInput from "./components/UserInput";
import styles from "./Search.module.css";

export default function Search() {
  const [userInput, setUserInput] = useState();
  const [refineOptions, setRefineOptions] = useState({});
  const [searchResults, setSearchResults] = useState();
  const [toggle, setToggle] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    function joinArrays(checkedArr) {
      const join = toggle ? "%2B" : "%7C";
      if (checkedArr?.length > 1) {
        return `${checkedArr.join(join)}`;
      } else if (checkedArr?.length === 1) {
        return `${checkedArr[0]}`;
      } else {
        return undefined;
      }
    }

    function mapObject(obj) {
      const paramsArr = [];
      for (const [key, value] of Object.entries(obj)) {
        joinArrays(value) !== undefined &&
          paramsArr.push(`${key}=${joinArrays(value)}`);
      }
      return paramsArr;
    }

    async function fetchResults() {
      try {
        const params = mapObject(refineOptions);
        userInput && params.push(`query=${userInput}`);
        const query = new URLSearchParams(params.join("&"));

        const response = await axiosPrivate.get(`/patterns/refine/?${query}`, {
          signal: controller.signal,
        });
        response?.data.splice(50);
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
  }, [refineOptions, userInput, toggle]);

  function handleChange(value, checked) {
    setRefineOptions((oldVal) => ({ ...oldVal, [value]: checked }));
  }

  function handleUserInput(msg) {
    setUserInput(msg);
  }

  function handleClick() {
    setToggle((oldVal) => !oldVal);
  }

  return (
    <div className={styles.searchPage}>
      <div className={styles.refine}>
        <Toggle toggle={toggle} handleClick={handleClick} />
        <RefineSearch handleChange={handleChange} />
      </div>
      <div>
        <UserInput handleUserInput={handleUserInput} />
        <div className={styles.searchResults}>
          {searchResults && <SearchResults list={searchResults} />}
        </div>
      </div>
    </div>
  );
}
