import usePattern from "../../hooks/usePattern";

export default function Thumbnail({ patternID, thumbnailOptions }) {
  const { urlSize, style, maxHeight } = thumbnailOptions;
  const pattern = usePattern(patternID);

  if (!pattern?.photos || !pattern?.photos[0]) return <p>Image not found</p>;
  const photoUrl = Object.values(pattern.photos)[0][urlSize];

  function image() {
    return (
      <img
        src={photoUrl}
        key={pattern.id}
        style={style}
        sizes="100vw"
        alt={`Image of pattern ${pattern.id}`}
      />
    );
  }

  return (
    <div style={{ maxHeight: maxHeight, overflow: "hidden" }}>{image()}</div>
  );
}
