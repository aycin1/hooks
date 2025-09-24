import { Link } from "react-router";
import useLists from "../../hooks/useLists";
import CreatePatterns from "./../CreatePatterns";

export default function DisplayPatterns({ chosenList }) {
  const { lists } = useLists();
  const thumbnailOptions = {
    urlSize: "medium_url",
    style: {
      width: "100%",
      height: "auto",
      maxWidth: "150px",
      minWidth: "150px",
      overflow: "hidden",
    },
    maxHeight: "150px",
    withLink: true,
  };

  return (
    <div className="listCardContainer">
      <Link to="/search">add more patterns here</Link>
      <div className="patternCards">
        <CreatePatterns
          list={lists[chosenList]}
          thumbnailOptions={thumbnailOptions}
          thumbnailOnly={false}
        />
      </div>
    </div>
  );
}
