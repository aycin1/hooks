import { useState } from "react";
import SearchLink from "../../../components/SearchLink/SearchLink";
import useLists from "../../../hooks/useLists";
import styles from "../Home.module.css";
import DisplayList from "./DisplayList";
import ListButton from "./ListButton";

export default function Dashboard() {
  const { lists } = useLists();
  const [chosenList, setChosenList] = useState();

  function handleClick(list) {
    setChosenList(list);
  }

  const chosenListContents =
    lists && Object.values(lists).find((list) => list.name === chosenList);

  return (
    <div className={styles.dashboard}>
      <div className={styles.listButtons}>
        {lists &&
          Object.values(lists).map((list) => (
            <ListButton
              key={list.name}
              title={list.name}
              handleClick={handleClick}
            />
          ))}
      </div>

      {chosenListContents?.patterns?.length ? (
        <DisplayList chosenList={chosenList} />
      ) : chosenList ? (
        <div className={styles.searchLink}>
          <SearchLink>
            this list is empty, click here to search patterns!
          </SearchLink>
        </div>
      ) : (
        <h4>please select a list</h4>
      )}
    </div>
  );
}
