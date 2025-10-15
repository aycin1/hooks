import { Link } from "react-router";

export default function PatternLink({ properties }) {
  function linkToPattern(properties) {
    if (properties.url || properties.downloadLocation) {
      return (
        <div>
          <Link to={properties.url || properties.downloadLocation}>
            Pattern
          </Link>{" "}
          by {properties.author}
        </div>
      );
    } else {
      return (
        <div>
          {properties.source?.name} ({properties.source?.type.toLowerCase()}) by{" "}
          {properties.author}
        </div>
      );
    }
  }

  return linkToPattern(properties);
}
