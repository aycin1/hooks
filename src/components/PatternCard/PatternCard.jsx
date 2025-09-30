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
    <div>
      {thumbnailOnly ? "" : <h5>{pattern?.name}</h5>}
      <Thumbnail pattern={pattern} thumbnailOptions={thumbnailOptions} />
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
