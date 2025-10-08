import { faSquare, faSquareCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCallback, useEffect, useState } from "react";
import styles from "../Search.module.css";
import Attributes from "./Attributes";
import Categories from "./Categories";
import CustomFilters from "./CustomFilters";

export default function RefineSearch({ setRefineOptions }) {
  const [catChecked, setCatChecked] = useState([]);
  const [attChecked, setAttChecked] = useState([]);
  const [customChecked, setCustomChecked] = useState([]);
  const [toggle, setToggle] = useState(false);
  const style = { color: "#709c62ff" };

  const joinArrays = useCallback(
    (checkedArr) => {
      const join = toggle ? "%2B" : "%7C";
      if (checkedArr?.length > 1) {
        return `${checkedArr.join(join)}`;
      } else if (checkedArr?.length === 1) {
        return `${checkedArr[0]}`;
      } else {
        return undefined;
      }
    },
    [toggle]
  );

  useEffect(() => {
    setRefineOptions([
      { name: "pc", value: joinArrays(catChecked) },
      { name: "pa", value: joinArrays(attChecked) },
      ...customChecked,
    ]);
  }, [
    catChecked,
    attChecked,
    customChecked,
    toggle,
    joinArrays,
    setRefineOptions,
  ]);

  return (
    <div className={styles.refineSearch}>
      <div
        className={styles.widenSearch}
        onClick={() => setToggle((oldVal) => !oldVal)}
      >
        <h4 className={styles.label}>Broaden search?</h4>
        {toggle ? (
          <FontAwesomeIcon icon={faSquare} value={toggle} style={style} />
        ) : (
          <FontAwesomeIcon icon={faSquareCheck} value={toggle} style={style} />
        )}
      </div>
      <CustomFilters setChecked={setCustomChecked} joinArrays={joinArrays} />
      <Categories checked={catChecked} setChecked={setCatChecked} />
      <Attributes checked={attChecked} setChecked={setAttChecked} />
    </div>
  );
}
