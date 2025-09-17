import useLists from "../hooks/useLists";
import PatternCard from "./PatternCard";

export default function CreatePatterns({ chosenList, thumbnailOptions }) {
  const { lists } = useLists();

  function mapLists() {
    return lists[chosenList].map((pattern) => {
      const patternID = pattern.pattern_id || pattern.id;
      return (
        <div key={patternID} className="patternCardContainer">
          <PatternCard
            patternID={patternID}
            list={chosenList}
            thumbnailOptions={thumbnailOptions}
          />
        </div>
      );
    });
  }

  return lists?.[chosenList] ? mapLists() : <p>Uh Oh</p>;
}
