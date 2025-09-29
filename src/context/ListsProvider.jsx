import { createContext, useEffect, useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const ListsContext = createContext({});

export function ListsProvider({ children }) {
  const [lists, setLists] = useState({});
  const axiosPrivate = useAxiosPrivate();

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
  }, [axiosPrivate, children]);

  return (
    <ListsContext.Provider value={lists}>{children}</ListsContext.Provider>
  );
}

export default ListsContext;
