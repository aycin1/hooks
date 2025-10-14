import styles from "../Home.module.css";

export default function ListButtons({ title, handleListSelect }) {
  function handleClick(e) {
    handleListSelect(e.target.name);
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
