import useLists from "../../hooks/useLists";
import List from "./components/List";

export default function Lists() {
  const { lists } = useLists();

  return (
    <>
      {lists &&
        Object.values(lists).map((list) => (
          <List key={list.name} listTitle={list.name} />
        ))}
    </>
  );
}
