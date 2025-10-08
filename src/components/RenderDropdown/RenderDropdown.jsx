import { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import DropdownOptions from "./DropdownOptions";

export default function RenderDropdown({ patternID }) {
  const axiosPrivate = useAxiosPrivate();
  const [message, setMessage] = useState();
  const [listForPattern, setListForPattern] = useState();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    async function fetchList() {
      try {
        const query = new URLSearchParams({ pattern_id: patternID });
        const response = (
          await axiosPrivate.get(`lists/pattern/?${query}`, {
            signal: controller.signal,
          })
        )?.data?.listForPattern?.list;
        isMounted && setListForPattern(response);
      } catch (error) {
        console.log(error);
      }
    }
    fetchList();
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [patternID, axiosPrivate]);

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
      <div>{message ? <p>{message}</p> : null}</div>
    </>
  );
}
