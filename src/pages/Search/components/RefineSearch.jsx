import { useState } from "react";
import Attributes from "./Attributes";
import Categories from "./Categories";

export default function RefineSearch() {
  const [catChecked, setCatChecked] = useState([]);
  const [attChecked, setAttChecked] = useState([]);

  return (
    <>
      <Categories catChecked={catChecked} setCatChecked={setCatChecked} />
      <Attributes attChecked={attChecked} setAttChecked={setAttChecked} />
    </>
  );
}
