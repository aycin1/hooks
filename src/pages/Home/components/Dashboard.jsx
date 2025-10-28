import { useState } from "react";
import SearchLink from "../../../components/SearchLink/SearchLink";
import useLists from "../../../hooks/useLists";
import styles from "../Home.module.css";
import DisplayList from "./DisplayList";
import ListButton from "./ListButton";

export default function Dashboard() {
  const lists = useLists();
  const [chosenList, setChosenList] = useState();

  function handleClick(list) {
    setChosenList(list);
  }

  return (
    <div className={styles.dashboard}>
      <div>
        {lists &&
          Object.keys(lists).map((title) => (
            <ListButton key={title} title={title} handleClick={handleClick} />
          ))}
      </div>
      {lists?.[chosenList]?.length ? (
        <DisplayList chosenList={chosenList} />
      ) : chosenList ? (
        <SearchLink>
          this list is empty, click here to search patterns!
        </SearchLink>
      ) : (
        <h4>please select a list</h4>
      )}
    </div>
  );
}
