import { Link } from "react-router";
import CreatePatterns from "../CreatePatterns";

export default function CreateList({ list, listTitle }) {
  const thumbnailOptions = {
    url: "medium_url",
    style: {
      width: "100%",
      height: "auto",
      maxWidth: "120px",
      minWidth: "120px",
      overflow: "hidden",
    },
    maxHeight: "120px",
    withLink: true,
  };

  return (
    <div className="listCardContainer">
      <h3>{listTitle}</h3>
      {list.length ? (
        <CreatePatterns list={list} thumbnailOptions={thumbnailOptions} />
      ) : (
        <Link to="/search">
          this list is empty, click here to search patterns!
        </Link>
      )}
    </div>
  );
}
