import { useEffect, useState } from "react";
import useAxiosPrivate from "./useAxiosPrivate";
export default function useUsername() {
  const [username, setUsername] = useState();
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    async function getUsername() {
      try {
        const response = await axiosPrivate.get(`/users/`, {
          signal: controller.signal,
        });
        isMounted && setUsername(response?.data);
      } catch (err) {
        console.log(err);
      }
    }

    getUsername();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [username, axiosPrivate]);

  return username;
}
