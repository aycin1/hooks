import { useState } from "react";
import { Link } from "react-router";
import useLists from "../../hooks/useLists";
import DisplayListButtons from "./DisplayListButtons";
import DisplayPatterns from "./DisplayPatterns";

export default function Dashboard() {
  const [chosenList, setChosenList] = useState();
  const { lists } = useLists();

  return (
    <div className="dashboardContainer">
      <DisplayListButtons setChosenList={setChosenList} />
      {lists?.[chosenList]?.length ? (
        <DisplayPatterns chosenList={chosenList} />
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
