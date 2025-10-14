import { faSquare, faSquareCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "../Search.module.css";
export default function Toggle({ toggle, handleClick }) {
  const style = { color: "#709c62ff" };

  return (
    <div className={styles.widenSearch} onClick={handleClick}>
      <h4 className={styles.label}>Broaden search?</h4>
      {toggle ? (
        <FontAwesomeIcon icon={faSquare} value={toggle} style={style} />
      ) : (
        <FontAwesomeIcon icon={faSquareCheck} value={toggle} style={style} />
      )}
    </div>
  );
}
