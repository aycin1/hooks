import useLists from "../../hooks/useLists";
import List from "./components/List";
import styles from "./Lists.module.css";

export default function Lists() {
  const lists = useLists();

  return (
    <div className={styles.lists}>
      {lists &&
        Object.values(lists).map((list) => (
          <List key={list.name} listTitle={list.name} />
        ))}
    </div>
  );
}
