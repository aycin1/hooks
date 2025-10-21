export default function DropdownOptions({ listForPattern, handleChange }) {
  let options = ["wishlist", "wip", "completed"];

  function handleOptions() {
    if (listForPattern) {
      const currentListIndex = options.indexOf(listForPattern);
      options.splice(currentListIndex, 1);
      options.push("remove");
      return options;
    } else {
      return options;
    }
  }
  const refinedOptions = handleOptions();
  const text = listForPattern ? "edit list" : "add to list";

  return (
    <select name="dropdown" onChange={(e) => handleChange(e)}>
      <option disabled selected>
        {text}
      </option>
      {refinedOptions.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}
