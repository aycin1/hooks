import { useContext } from "react";
import { ListsContext } from "../context/ListsContext";

export default function useLists() {
  return useContext(ListsContext);
}
