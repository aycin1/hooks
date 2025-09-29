export default function ListButtons({ title, setChosenList }) {
  function handleClick(e) {
    setChosenList(e.target.name);
  }

  return (
    <button className="listButton" name={title} onClick={(e) => handleClick(e)}>
      {title}
    </button>
  );
}
