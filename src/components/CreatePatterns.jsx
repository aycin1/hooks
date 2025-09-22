import PatternCard from "./PatternCard";

export default function CreatePatterns({ list, thumbnailOptions }) {
  function mapLists() {
    return list.map((pattern) => {
      const patternID = pattern.pattern_id || pattern.id;
      return (
        <div key={patternID} className="patternCard">
          <PatternCard
            patternID={patternID}
            thumbnailOptions={thumbnailOptions}
          />
        </div>
      );
    });
  }

  return (
    <div className="patternCardWrapper">{list ? mapLists() : <p>Uh Oh</p>}</div>
  );
}
