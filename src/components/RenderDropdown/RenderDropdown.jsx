import { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useLists from "../../hooks/useLists";
import DropdownOptions from "./DropdownOptions";

export default function RenderDropdown({ patternID }) {
  const axiosPrivate = useAxiosPrivate();
  const lists = useLists();
  const [message, setMessage] = useState();
  const [listForPattern, setListForPattern] = useState();

  useEffect(() => {
    let isMounted = true;

    Object.values(lists).map((list) =>
      list.map((pattern) =>
        parseInt(pattern.pattern_id) === parseInt(patternID) && isMounted
          ? setListForPattern(pattern.list)
          : null
      )
    );

    return () => (isMounted = false);
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
