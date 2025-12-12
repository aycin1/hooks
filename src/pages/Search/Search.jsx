import { faSquare, faSquareCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { axiosPrivate } from "../../api/axios";
import RefineSearch from "./components/RefineSearch";
import SearchResults from "./components/SearchResults";
import UserInput from "./components/UserInput";
import styles from "./Search.module.css";

export default function Search() {
  const [userInput, setUserInput] = useState();
  const [refineOptions, setRefineOptions] = useState({});
  const [searchResults, setSearchResults] = useState([]);
  const [toggle, setToggle] = useState(true);
  const style = { color: "#709c62ff" };

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    function joinArrays(checkedArr) {
      if (checkedArr?.length > 1) {
        return `${checkedArr.join(toggle ? "%252B" : "%257C")}`;
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

        isMounted && setSearchResults(response?.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchResults();
    return () => {
      isMounted = false;
      isMounted && controller.abort();
    };
  }, [refineOptions, userInput, toggle]);

  function handleClick() {
    setToggle((oldVal) => !oldVal);
  }

  function handleChange(value, checked) {
    setRefineOptions((oldVal) => ({ ...oldVal, [value]: checked }));
  }

  function handleUserInput(msg) {
    setUserInput(msg);
  }

  return (
    <div className={styles.searchPage}>
      <div className={styles.sidebar}>
        <div className={styles.widenSearch}>
          <h4 className={styles.label}>Broaden search?</h4>
          <FontAwesomeIcon
            icon={toggle ? faSquare : faSquareCheck}
            value={toggle}
            style={style}
            onClick={handleClick}
          />
        </div>
        <RefineSearch handleChange={handleChange} />
      </div>
      <div className={styles.body}>
        <UserInput handleUserInput={handleUserInput} />
        <div className={styles.searchResults}>
          {searchResults && <SearchResults list={searchResults} />}
        </div>
      </div>
    </div>
  );
}
