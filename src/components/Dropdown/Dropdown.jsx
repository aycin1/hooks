import { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useLists from "../../hooks/useLists";
import DropdownOptions from "./DropdownOptions";

export default function Dropdown({ patternID }) {
  const axiosPrivate = useAxiosPrivate();
  const { lists, refreshLists } = useLists();
  const [currentList, setCurrentList] = useState("");

  useEffect(() => {
    const list =
      lists &&
      Object.values(lists)
        .flatMap((list) => list.patterns)
        .filter(
          (pattern) => parseInt(pattern?.pattern_id) === parseInt(patternID)
        );
    setCurrentList(list?.[0]?.name);
  }, [lists, patternID]);

  async function getResponse(value) {
    return value === "remove"
      ? await axiosPrivate.delete("/lists/", {
          data: {
            pattern_id: parseInt(patternID),
          },
        })
      : currentList
      ? await axiosPrivate.patch("/lists/", {
          pattern_id: parseInt(patternID),
          list: value,
        })
      : await axiosPrivate.post("/lists/", {
          pattern_id: parseInt(patternID),
          list: value,
        });
  }

  async function handleChange(e) {
    try {
      const response = await getResponse(e.target.value);
      response?.data?.message && refreshLists();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <DropdownOptions
        key={patternID}
        listForPattern={currentList}
        handleChange={handleChange}
      />
    </>
  );
}
