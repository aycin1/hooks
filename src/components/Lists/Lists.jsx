import { Link } from "react-router";
import useLists from "../../hooks/useLists";
import CreateList from "./CreateList";

export default function Lists() {
  const { lists } = useLists();

  function mapLists() {
    const listTitles = Object.keys(lists).map((title) => title);
    const listsArr = Object.values(lists).map((list) => list);
    return listsArr.map((list, index) => {
      return (
        <CreateList list={list} index={index} chosenList={listTitles[index]} />
      );
    });
  }

  return (
    <div>
      {mapLists()}
      <Link to="/">Home</Link>
    </div>
  );
}
