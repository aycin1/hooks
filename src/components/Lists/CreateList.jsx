import { Link } from "react-router";
import CreatePatterns from "../CreatePatterns";

export default function CreateList({ list, index, chosenList }) {
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
    <div key={index} className="listCardContainer">
      <h3>{chosenList}</h3>
      {list.length ? (
        <CreatePatterns
          chosenList={chosenList}
          thumbnailOptions={thumbnailOptions}
        />
      ) : (
        <Link to="/search">
          this list is empty, click here to search patterns!
        </Link>
      )}
    </div>
  );
}
