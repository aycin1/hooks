import useLists from "../../hooks/useLists";
import styles from "./Dropdown.module.css";

export default function DropdownOptions({ listForPattern, handleChange }) {
  const { lists } = useLists();
  let options = lists && Object.values(lists).map((list) => list.name);

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
      <option disabled value="" className={styles.text}>
        {text}
      </option>
      {refinedOptions?.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}
