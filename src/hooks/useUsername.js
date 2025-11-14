import { useEffect, useState } from "react";
import useAuth from "./useAuth";
import useAxiosPrivate from "./useAxiosPrivate";

export default function useUsername() {
  const [username, setUsername] = useState("");
  const axiosPrivate = useAxiosPrivate();
  const { auth } = useAuth();

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
      isMounted && controller.abort();
    };
  }, [auth, axiosPrivate]);

  return username;
}
