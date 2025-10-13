import { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useLists from "../../hooks/useLists";
import DropdownOptions from "./DropdownOptions";

export default function RenderDropdown({ patternID }) {
  const axiosPrivate = useAxiosPrivate();
  const [message, setMessage] = useState();
  const [listForPattern, setListForPattern] = useState();
  const lists = useLists();

  useEffect(() => {
    const listTitles = Object.keys(lists).map((list) => list);
    Object.values(lists).map((list, index) =>
      list.map(
        (pattern) =>
          pattern.pattern_id === patternID &&
          setListForPattern(listTitles[index])
      )
    );
  }, [lists, patternID]);

  async function handleChange(e) {
    const desiredList = e.target.value;

    const data =
      desiredList === "remove"
        ? { pattern_id: patternID }
        : { pattern_id: patternID, list: desiredList };

    try {
      const response =
        desiredList === "remove"
          ? await axiosPrivate.delete("/lists/", { data })
          : listForPattern
          ? await axiosPrivate.patch("/lists/", data)
          : await axiosPrivate.post("/lists/", data);

      if (response?.data?.message) setMessage(response.data.message);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <DropdownOptions
        key={patternID}
        listForPattern={listForPattern}
        handleChange={handleChange}
      />
      <div>{message && <p>{message}</p>}</div>
    </>
  );
}
