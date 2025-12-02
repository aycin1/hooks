import { useCallback, useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { ListsContext } from "./ListsContext";

export function ListsProvider({ children }) {
  const [lists, setLists] = useState();
  const axiosPrivate = useAxiosPrivate();
  const { auth } = useAuth();

  const refreshLists = async () => {
    try {
      const response = await axiosPrivate.get("/lists/");
      setLists(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    refreshLists();
  }, [auth.username]);

  return (
    <ListsContext.Provider value={{ lists, refreshLists }}>
      {children}
    </ListsContext.Provider>
  );
}
