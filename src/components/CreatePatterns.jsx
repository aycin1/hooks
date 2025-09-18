import PatternCard from "./PatternCard";

export default function CreatePatterns({ list, thumbnailOptions }) {
  console.log(list);
  function mapLists() {
    return list.map((pattern) => {
      const patternID = pattern.pattern_id || pattern.id;
      return (
        <div key={patternID} className="patternCardContainer">
          <PatternCard
            patternID={patternID}
            thumbnailOptions={thumbnailOptions}
          />
        </div>
      );
    });
  }

  return list ? mapLists() : <p>Uh Oh</p>;
}
