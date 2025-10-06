import { useEffect, useState } from "react";
import Attributes from "./Attributes";
import Categories from "./Categories";

export default function RefineSearch({ setRefineOptions }) {
  const [catChecked, setCatChecked] = useState([]);
  const [attChecked, setAttChecked] = useState([]);

  useEffect(() => {
    function joinArrays(checked, join) {
      if (checked?.length > 1) {
        return `${checked.join(join)}`;
      } else if (checked?.length === 1) {
        return `${checked[0]}`;
      } else {
        return undefined;
      }
    }
    const catStr = joinArrays(catChecked, "%7C");
    const attStr = joinArrays(attChecked, "%2B");

    setRefineOptions([
      { name: "pc", value: catStr },
      { name: "pa", value: attStr },
    ]);
  }, [catChecked, attChecked, setRefineOptions]);

  return (
    <>
      <Categories catChecked={catChecked} setCatChecked={setCatChecked} />
      <Attributes attChecked={attChecked} setAttChecked={setAttChecked} />
    </>
  );
}
