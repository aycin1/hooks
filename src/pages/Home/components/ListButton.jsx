import styles from "../Home.module.css";

export default function ListButton({ title, handleClick }) {
  return (
    <button
      className={styles.listButton}
      name={title}
      data-testid="list-button"
      onClick={(e) => handleClick(e.target.name)}
    >
      {title}
    </button>
  );
}
