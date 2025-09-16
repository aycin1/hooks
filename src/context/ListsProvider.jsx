import { createContext, useState } from "react";

const ListsContext = createContext({});

export function ListsProvider({ children }) {
  const [lists, setLists] = useState({});

  return (
    <ListsContext.Provider value={{ lists, setLists }}>
      {children}
    </ListsContext.Provider>
  );
}

export default ListsContext;
