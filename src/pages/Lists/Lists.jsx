import useLists from "../../hooks/useLists";
import List from "./components/List";
import styles from "./Lists.module.css";

export default function Lists() {
  const lists = useLists();

  return (
    <div className={styles.lists}>
      {Object.entries(lists).map(([key, value]) => (
        <List key={key} list={value} listTitle={key} />
      ))}
    </div>
  );
}
