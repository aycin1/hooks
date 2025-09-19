import { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useLists from "../../hooks/useLists";
import DropdownOptions from "./DropdownOptions";

export default function RenderDropdown({ patternID }) {
  const lists = useLists();
  const axiosPrivate = useAxiosPrivate();
  const [message, setMessage] = useState();
  const [error, setError] = useState();
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
    const desiredList = e.value;

    // if (listForPattern) {
    //   if (desiredList === "remove") {
    //     return await editList(
    //       "DELETE",
    //       { pattern_id: patternID },
    //       setError,
    //       setMessage
    //     );
    //   }
    //   const isInDesiredList = list === desiredList;

    //   return inAnyList === undefined
    //     ? await editList(
    //         "POST",
    //         { pattern_id: patternID, list: desiredList },
    //         setError,
    //         setMessage
    //       )
    //     : inAnyList !== undefined && isInDesiredList === false
    //     ? await editList(
    //         "PATCH",
    //         { pattern_id: patternID, list: desiredList },
    //         setError,
    //         setMessage
    //       )
    //     : setMessage(`This pattern is already in your ${desiredList}`);
    // }
  }

  return (
    <>
      <DropdownOptions
        key={patternID}
        listForPattern={listForPattern}
        handleChange={handleChange}
      />
      <div>{message ? <p>{message}</p> : null}</div>
      <div>{error ? <p>{error}</p> : null}</div>
    </>
  );
}
