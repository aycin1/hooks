import { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useLists from "../../hooks/useLists";
import DropdownOptions from "./DropdownOptions";

export default function Dropdown({ patternID }) {
  const axiosPrivate = useAxiosPrivate();
  const { lists, refreshLists } = useLists();
  const [message, setMessage] = useState();
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
  }, [lists, patternID, message]);

  async function getResponse(value) {
    const response =
      value === "remove"
        ? (await axiosPrivate.delete("/lists/", {
            data: {
              pattern_id: parseInt(patternID),
            },
          }),
          refreshLists())
        : currentList
        ? (await axiosPrivate.patch("/lists/", {
            pattern_id: parseInt(patternID),
            list: value,
          }),
          refreshLists())
        : (await axiosPrivate.post("/lists/", {
            pattern_id: parseInt(patternID),
            list: value,
          }),
          refreshLists());
    return response;
  }

  async function handleChange(e) {
    try {
      const response = await getResponse(e.target.value);

      if (response?.data?.message) {
        setMessage(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      {message ? (
        <p style={{ fontSize: "small" }}>{message}</p>
      ) : (
        <DropdownOptions
          key={patternID}
          listForPattern={currentList}
          handleChange={handleChange}
        />
      )}
    </>
  );
}
