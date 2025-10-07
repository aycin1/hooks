import PatternCard from "../PatternCard/PatternCard";

export default function CreatePatterns({ list, thumbnailOptions }) {
  function mapLists() {
    return list.map((pattern) => {
      const patternID = pattern.pattern_id || pattern.id;
      return (
        <PatternCard
          key={patternID}
          patternID={patternID}
          thumbnailOptions={thumbnailOptions}
          thumbnailOnly={false}
        />
      );
    });
  }

  return list ? mapLists() : <p>Uh Oh</p>;
}
