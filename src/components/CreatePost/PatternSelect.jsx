import DisplayPatterns from "./DisplayPatterns";

export default function PatternSelect({ chosenPattern, handlePattern }) {
  return !chosenPattern ? (
    <>
      <p style={{ fontSize: "12pt" }}>
        Select a pattern (from your lists) to link your post to
      </p>

      <DisplayPatterns handlePattern={handlePattern} />
    </>
  ) : (
    <button onClick={() => handlePattern(null)}>
      back to pattern selection
    </button>
  );
}
