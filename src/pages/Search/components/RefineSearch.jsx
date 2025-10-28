import styles from "../Search.module.css";
import Attributes from "./Attributes";
import Categories from "./Categories";
import Checkbox from "./Checkbox";
import nodes from "./customNodes";

export default function RefineSearch({ handleChange }) {
  return (
    <div className={styles.refineSearch}>
      {nodes?.map((node, i) => (
        <Checkbox
          key={i}
          node={node}
          value={node[0].value}
          handleChange={handleChange}
        />
      ))}
      <Attributes handleChange={handleChange} />
      <Categories handleChange={handleChange} />
    </div>
  );
}
