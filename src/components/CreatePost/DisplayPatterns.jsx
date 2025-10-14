import useLists from "../../hooks/useLists";
import Thumbnail from "../Thumbnail/Thumbnail";

export default function DisplayPatterns({ handlePattern }) {
  const lists = useLists();

  const patterns = Object.values(lists)
    .flatMap((list) => list)
    .map((pattern) => pattern.pattern_id);

  const thumbnailOptions = {
    urlSize: "small_url",
    style: { width: "80px", height: "auto" },
    maxHeight: "80px",
  };

  return patterns.map((pattern) => {
    return (
      <div key={pattern} onClick={() => handlePattern(pattern)}>
        <Thumbnail thumbnailOptions={thumbnailOptions} patternID={pattern} />
      </div>
    );
  });
}
