import PatternCard from "../PatternCard/PatternCard";
import RenderDropdown from "../RenderDropdown/RenderDropdown";

export default function CreatePatterns({
  list,
  thumbnailOptions,
  withDropdown,
}) {
  function mapLists() {
    return list.map((pattern) => {
      const patternID = pattern.pattern_id || pattern.id;

      return (
        <div key={patternID}>
          <PatternCard
            patternID={patternID}
            thumbnailOptions={thumbnailOptions}
          />
          {withDropdown && <RenderDropdown patternID={patternID} />}
        </div>
      );
    });
  }

  return list && mapLists();
}
