import useLists from "../../hooks/useLists";
import CreateList from "./CreateList";

export default function Lists() {
  const { lists } = useLists();
  const listTitles = Object.keys(lists).map((listTitle) => listTitle);

  function mapLists() {
    return Object.values(lists).map((listArr, index) => {
      return (
        <CreateList key={index} list={listArr} listTitle={listTitles[index]} />
      );
    });
  }

  return <div>{mapLists()}</div>;
}
