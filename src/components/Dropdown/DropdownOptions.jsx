import styles from "./Dropdown.module.css";

export default function DropdownOptions({ listForPattern, handleChange }) {
  let options = ["wishlist", "wip", "completed"];

  function handleOptions(list) {
    if (list) {
      const currentListIndex = options.indexOf(listForPattern);
      options.splice(currentListIndex, 1);
      options.push("remove");
      return options;
    } else {
      return options;
    }
  }

  const refinedOptions = handleOptions(listForPattern);
  const text = listForPattern ? "edit list" : "add to list";

  return (
    <select
      name="dropdown"
      value=""
      onChange={handleChange}
      className={styles.dropdown}
    >
      <option disabled value="">
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
