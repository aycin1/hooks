import { Link } from "react-router";
import usePattern from "../../../hooks/usePattern";

export default function PatternLink({ patternID }) {
  const pattern = usePattern(patternID);

  function linkToPattern(properties) {
    if (properties?.url || properties?.downloadLocation) {
      return (
        <div>
          <Link
            to={properties?.url || properties?.downloadLocation}
            target="_blank"
          >
            Pattern
          </Link>{" "}
          by {properties?.author}
        </div>
      );
    } else {
      return (
        <div>
          {properties?.source?.name} ({properties?.source?.type.toLowerCase()})
          by {properties?.author}
        </div>
      );
    }
  }

  return linkToPattern(pattern);
}
