import useLists from "../../hooks/useLists";
import List from "./components/List";
import styles from "./Lists.module.css";

export default function Lists() {
  const lists = useLists();

  return (
    <div className={styles.lists}>
      {lists &&
        Object.keys(lists).map((key) => <List key={key} listTitle={key} />)}
    </div>
  );
}
