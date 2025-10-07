import { useEffect, useState } from "react";
import Checkbox from "./Checkbox";

export default function CustomFilters({ setChecked, joinArrays }) {
  const [craftChecked, setCraftChecked] = useState([]);
  const [avaChecked, setAvaChecked] = useState([]);
  const [weightChecked, setWeightChecked] = useState([]);

  useEffect(() => {
    setChecked([
      { name: "craft", value: joinArrays(craftChecked) },
      { name: "availability", value: joinArrays(avaChecked) },
      { name: "weight", value: joinArrays(weightChecked) },
    ]);
  }, [craftChecked, avaChecked, weightChecked, joinArrays, setChecked]);

  const craftNode = [
    {
      value: "craft",
      label: "Craft",
      children: [
        { value: "crochet", label: "Crochet" },
        { value: "knitting", label: "Knitting" },
        { value: "machine-knitting", label: "Machine Knitting" },
        { value: "loom-knitting", label: "Loom Knitting" },
      ],
    },
  ];

  const availabilityNode = [
    {
      value: "availability",
      label: "Availability",
      children: [
        { value: "free", label: "Free" },
        { value: "online", label: "Purchase online" },
        { value: "inprint", label: "Purchase in print" },
        { value: "ravelry", label: "Ravelry download" },
      ],
    },
  ];

  const weightNode = [
    {
      value: "weight",
      label: "Weight",
      children: [
        { value: "thread", label: "Thread" },
        { value: "cobweb", label: "Cobweb" },
        { value: "lace", label: "Lace" },
        { value: "light-fingering", label: "Light Fingering" },
        { value: "fingering", label: "Fingering" },
        { value: "sport", label: "Sport" },
        { value: "dk", label: "DK" },
        { value: "worsted", label: "Worsted" },
        { value: "aran", label: "Aran" },
        { value: "bulky", label: "Bulky" },
        { value: "super-bulky", label: "Super Bulky" },
        { value: "jumbo", label: "Jumbo" },
      ],
    },
  ];

  return (
    <>
      <Checkbox
        node={craftNode}
        checked={craftChecked}
        setChecked={setCraftChecked}
      />
      <Checkbox
        node={availabilityNode}
        checked={avaChecked}
        setChecked={setAvaChecked}
      />
      <Checkbox
        node={weightNode}
        checked={weightChecked}
        setChecked={setWeightChecked}
      />
    </>
  );
}
