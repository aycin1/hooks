import { useEffect } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useLists from "../hooks/useLists";

export default function Home() {
  const { lists, setLists } = useLists();
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    async function getLists() {
      try {
        const response = await axiosPrivate.get("/lists", {
          signal: controller.signal,
        });
        console.log(response.data);

        isMounted && setLists(response.data);
      } catch (err) {
        console.log(err);
      }
    }

    getLists();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  return <div>{lists ? JSON.stringify(lists) : "hi"}</div>;
}
