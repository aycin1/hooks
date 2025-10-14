import styles from "../Home.module.css";

export default function ListButtons({ title, handleListSelect }) {
  return (
    <button
      className={styles.listButton}
      name={title}
      onClick={(e) => handleListSelect(e.target.name)}
    >
      {title}
    </button>
  );
}
