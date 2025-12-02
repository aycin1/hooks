import { useCallback, useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { ListsContext } from "./ListsContext";

export function ListsProvider({ children }) {
  const [lists, setLists] = useState();
  const axiosPrivate = useAxiosPrivate();
  const { auth } = useAuth();

  const refreshLists = useCallback(async () => {
    try {
      const response = await axiosPrivate.get("/lists/");
      setLists(response.data);
    } catch (err) {
      console.log(err);
    }
  }, [axiosPrivate]);

  useEffect(() => {
    refreshLists();
  }, [auth.username, refreshLists]);

  return (
    <ListsContext.Provider value={{ lists, refreshLists }}>
      {children}
    </ListsContext.Provider>
  );
}
