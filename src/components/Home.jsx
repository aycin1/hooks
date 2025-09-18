import { useEffect } from "react";
import { Link } from "react-router";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useLists from "../hooks/useLists";
import Dashboard from "./Dashboard/Dashboard";

export default function Home() {
  const { setLists } = useLists();
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    async function getLists() {
      try {
        const response = await axiosPrivate.get("/lists", {
          signal: controller.signal,
        });

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

  return (
    <>
      <Dashboard />
      <Link to="/lists">Lists</Link>
    </>
  );
}
