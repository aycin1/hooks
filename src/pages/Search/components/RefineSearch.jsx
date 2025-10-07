import { useCallback, useEffect, useState } from "react";
import Attributes from "./Attributes";
import Categories from "./Categories";
import CustomFilters from "./CustomFilters";

export default function RefineSearch({ setRefineOptions }) {
  const [catChecked, setCatChecked] = useState([]);
  const [attChecked, setAttChecked] = useState([]);
  const [customChecked, setCustomChecked] = useState([]);
  const [toggle, setToggle] = useState(false);

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
  }, [catChecked, attChecked, customChecked, joinArrays, setRefineOptions]);

  return (
    <>
      <label htmlFor="andOr">
        check if you'd like <strong>all</strong> filters to apply
        <br />
        instead of either/any
      </label>
      <input
        type="checkbox"
        id="andOr"
        value={toggle}
        onClick={() => setToggle((oldVal) => !oldVal)}
      />
      <CustomFilters setChecked={setCustomChecked} joinArrays={joinArrays} />
      <Categories checked={catChecked} setChecked={setCatChecked} />
      <Attributes checked={attChecked} setChecked={setAttChecked} />
    </>
  );
}
