import styles from "../Home.module.css";

export default function ListButtons({ title, handleClick }) {
  return (
    <button
      className={styles.listButton}
      name={title}
      onClick={(e) => handleClick(e.target.name)}
    >
      {title}
    </button>
  );
}
