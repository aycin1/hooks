import { useState } from "react";
import { Link } from "react-router";
import useLists from "../../../hooks/useLists";
import styles from "../Home.module.css";
import DisplayListButtons from "./DisplayListButtons";
import DisplayLists from "./DisplayLists";

export default function Dashboard() {
  const [chosenList, setChosenList] = useState();
  const lists = useLists();

  return (
    <div className={styles.dashboard}>
      <DisplayListButtons setChosenList={setChosenList} />
      {lists?.[chosenList]?.length ? (
        <DisplayLists chosenList={chosenList} />
      ) : chosenList ? (
        <Link to="/search">
          this list is empty, click here to search patterns!
        </Link>
      ) : (
        "please select a list"
      )}
    </div>
  );
}
