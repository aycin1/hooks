import { Link } from "react-router";
import usePattern from "../../hooks/usePattern";
import Thumbnail from "../Thumbnail/Thumbnail";

export default function PatternCard({ patternID, thumbnailOptions }) {
  const name = usePattern(patternID)?.name;

  return (
    <div style={({ margin: "0vh 2vh 3vh" }, { overflow: "hidden" })}>
      <p style={{ fontSize: "small" }}>{name}</p>
      <Link to={`/pattern/${patternID}`}>
        <Thumbnail patternID={patternID} thumbnailOptions={thumbnailOptions} />
      </Link>
    </div>
  );
}
