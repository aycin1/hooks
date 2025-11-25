import usePattern from "../../hooks/usePattern";

export default function Thumbnail({ patternID, thumbnailOptions }) {
  const { urlSize, style, maxHeight } = thumbnailOptions;
  const pattern = usePattern(patternID);

  function getUrl(pattern) {
    return Object.values(pattern.photos)[0]?.[urlSize];
  }

  return (
    <div style={{ maxHeight: maxHeight, overflow: "hidden" }}>
      {pattern && pattern.photos ? (
        <img
          src={getUrl(pattern)}
          key={pattern.id}
          style={style}
          sizes="100vw"
          alt={`Image of pattern ${pattern.id}`}
        />
      ) : (
        "Image not found"
      )}
    </div>
  );
}
