import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { ListsContext } from "./ListsContext";

export function ListsProvider({ children }) {
  const [lists, setLists] = useState();
  const axiosPrivate = useAxiosPrivate();
  const { auth } = useAuth();

  useEffect(() => {
    async function getLists() {
      try {
        const response = await axiosPrivate.get("/lists");
        setLists(response.data);
      } catch (err) {
        console.log(err);
      }
    }
    getLists();
  }, [auth, children, axiosPrivate]);

  return (
    <ListsContext.Provider value={lists}>{children}</ListsContext.Provider>
  );
}
