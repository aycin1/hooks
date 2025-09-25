import { Link } from "react-router";

export default function Thumbnail({ pattern, thumbnailOptions }) {
  const { urlSize, style, maxHeight, withLink } = thumbnailOptions;
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
  if (withLink) {
    return (
      <div style={{ maxHeight: maxHeight, overflow: "hidden" }}>
        <Link to={`/pattern/${pattern.pattern_id || pattern.id}`}>
          {image()}
        </Link>
      </div>
    );
  } else {
    return (
      <div style={{ maxHeight: maxHeight, overflow: "hidden" }}>{image()}</div>
    );
  }
}
