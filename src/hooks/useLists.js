import { useContext } from "react";
import ListsContext from "../context/ListsProvider";

export default function useLists() {
  return useContext(ListsContext);
}
