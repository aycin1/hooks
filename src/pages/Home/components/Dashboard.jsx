import { useState } from "react";
import { Link } from "react-router";
import useLists from "../../../hooks/useLists";
import styles from "../Home.module.css";
import DisplayLists from "./DisplayLists";
import ListButtons from "./ListButtons";

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
            <ListButtons key={title} title={title} handleClick={handleClick} />
          ))}
      </div>
      {lists?.[chosenList]?.length ? (
        <DisplayLists chosenList={chosenList} />
      ) : chosenList ? (
        <Link to="/search">
          this list is empty, click here to search patterns!
        </Link>
      ) : (
        <h4>please select a list</h4>
      )}
    </div>
  );
}
