import useFetchPattern from "../hooks/useFetchPattern";
import RenderDropdown from "./RenderDropdown/RenderDropdown";
import Thumbnail from "./Thumbnail";

export default function PatternCard({
  patternID,
  thumbnailOptions,
  thumbnailOnly,
}) {
  const pattern = useFetchPattern(patternID);

  return (
    <div>
      <div>
        {thumbnailOnly ? "" : <h5>{pattern?.name}</h5>}
        <div className="thumbnailContainer">
          <Thumbnail pattern={pattern} thumbnailOptions={thumbnailOptions} />
        </div>
      </div>
      {thumbnailOnly ? (
        ""
      ) : (
        <div className="dropdownContainer">
          <RenderDropdown patternID={patternID} />
        </div>
      )}
    </div>
  );
}
