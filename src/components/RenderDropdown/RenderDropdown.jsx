import { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import DropdownOptions from "./DropdownOptions";

export default function RenderDropdown({ patternID }) {
  const axiosPrivate = useAxiosPrivate();
  const [message, setMessage] = useState();
  const [listForPattern, setListForPattern] = useState();

  useEffect(() => {
    async function fetchList() {
      setListForPattern(
        (await axiosPrivate.get(`lists/pattern/${patternID}`))?.data
          ?.listForPattern?.list
      );
    }
    fetchList();
  }, [patternID]);

  async function handleChange(e) {
    const desiredList = e.target.value;

    const data =
      desiredList === "remove"
        ? { pattern_id: patternID }
        : { pattern_id: patternID, list: desiredList };

    const response =
      desiredList === "remove"
        ? await axiosPrivate.delete("/lists/", { data })
        : listForPattern
        ? await axiosPrivate.patch("/lists/", data)
        : await axiosPrivate.post("/lists/", data);

    if (response?.data?.message) setMessage(response.data.message);
  }

  return (
    <>
      <DropdownOptions
        key={patternID}
        listForPattern={listForPattern}
        handleChange={handleChange}
      />
      <div>{message ? <p>{message}</p> : null}</div>
    </>
  );
}
