import styles from "../Home.module.css";

export default function ListButtons({ title, setChosenList }) {
  function handleClick(e) {
    setChosenList(e.target.name);
  }

  return (
    <button
      className={styles.listButton}
      name={title}
      onClick={(e) => handleClick(e)}
    >
      {title}
    </button>
  );
}
