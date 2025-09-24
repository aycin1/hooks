import { useEffect, useState } from "react";
import useAxiosPrivate from "./useAxiosPrivate";

export default function useFetchPattern(patternID) {
  const [pattern, setPattern] = useState();
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    async function getPattern() {
      try {
        const response = await axiosPrivate.get(
          `/patterns/filter/${patternID}`
        );
        isMounted && setPattern(response?.data?.pattern);
      } catch (error) {
        console.log(error);
      }
    }

    getPattern();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [patternID, axiosPrivate]);

  return pattern;
}
