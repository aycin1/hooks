import PatternCard from "../PatternCard";
import useLists from "./../../hooks/useLists";

export default function SelectPattern({ setChosenPatternID }) {
  const lists = useLists();

  const patterns = Object.values(lists)
    .flatMap((list) => list)
    .map((pattern) => pattern.pattern_id);

  const thumbnailOptions = {
    urlSize: "small_url",
    style: { width: "80px", height: "auto" },
    maxHeight: "80px",
    withLink: false,
  };

  return patterns.map((pattern) => {
    return (
      <div
        className=""
        key={pattern}
        onClick={() => setChosenPatternID(pattern)}
      >
        <PatternCard
          patternID={pattern}
          thumbnailOptions={thumbnailOptions}
          thumbnailOnly={true}
        />
      </div>
    );
  });
}
