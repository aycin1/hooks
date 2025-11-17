import styles from "../Home.module.css";

export default function ListButton({ title, handleClick }) {
  return (
    <button
      className={styles.listButton}
      name={title}
      aria-label={`list button for ${title}`}
      onClick={(e) => handleClick(e.target.name)}
    >
      {title}
    </button>
  );
}
