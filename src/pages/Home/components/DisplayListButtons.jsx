import useLists from "../../../hooks/useLists";
import ListButtons from "./ListButtons";

export default function DisplayListButtons({ handleListSelect }) {
  const lists = useLists();

  const listTitles = Object.keys(lists).map((list) => {
    return list;
  });

  const getListButtons = Object.values(lists).map((list, i) => {
    return (
      <ListButtons
        key={listTitles[i]}
        title={listTitles[i]}
        handleListSelect={handleListSelect}
      />
    );
  });

  return <div>{getListButtons}</div>;
}
