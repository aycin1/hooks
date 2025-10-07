import useFetchPattern from "../../hooks/useFetchPattern";
import RenderDropdown from "../RenderDropdown/RenderDropdown";
import Thumbnail from "../Thumbnail/Thumbnail";

export default function PatternCard({
  patternID,
  thumbnailOptions,
  thumbnailOnly,
}) {
  const pattern = useFetchPattern(patternID);

  return (
    <div style={{ margin: "0vh 2vh 3vh" }}>
      {thumbnailOnly ? "" : <h5>{pattern?.name}</h5>}
      <Thumbnail pattern={pattern} thumbnailOptions={thumbnailOptions} />
      {thumbnailOnly ? "" : <RenderDropdown patternID={patternID} />}
    </div>
  );
}
