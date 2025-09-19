export default function DropdownOptions({ listForPattern, handleChange }) {
  let options = ["wishlist", "wip", "completed"];

  function handleOptions() {
    if (listForPattern) {
      const currentListIndex = options.indexOf(listForPattern);
      options.splice(currentListIndex, 1);
      options.push("remove");
      console.log(options);
      return options;
    } else {
      return options;
    }
  }
  const refinedOptions = handleOptions();
  const text = listForPattern ? "edit list" : "add to list";

  return (
    <select name="dropdown" onChange={(e) => handleChange(e.target.value)}>
      <option value="" disabled selected>
        {text}
      </option>
      {refinedOptions.map((option) => (
        <option value={option}>{option}</option>
      ))}
    </select>
  );
}
