import {
  faChevronDown,
  faChevronRight,
  faFolder,
  faFolderOpen,
  faSquare,
  faSquareCheck,
  faSquareMinus,
  faSquarePlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import CheckboxTree from "react-checkbox-tree";
import "react-checkbox-tree/lib/react-checkbox-tree.css";

export default function Checkbox({ node, value, handleChange, expandAll }) {
  const [checked, setChecked] = useState([]);
  const [expanded, setExpanded] = useState([]);
  const style = { color: "#2a5a36" };

  return (
    <CheckboxTree
      nodes={node}
      onlyLeafCheckboxes={true}
      checked={checked}
      expanded={expanded}
      onCheck={(checked) => {
        setChecked(checked);
        handleChange(value, checked);
      }}
      onExpand={(expanded) => setExpanded(expanded)}
      showExpandAll={expandAll}
      noCascade={true}
      checkModel="all"
      icons={{
        check: (
          <FontAwesomeIcon
            icon={faSquareCheck}
            style={{ color: "#709c62ff" }}
          />
        ),
        uncheck: (
          <FontAwesomeIcon icon={faSquare} style={{ color: "#709c62ff" }} />
        ),
        expandClose: <FontAwesomeIcon icon={faChevronRight} style={style} />,
        expandOpen: <FontAwesomeIcon icon={faChevronDown} style={style} />,
        expandAll: <FontAwesomeIcon icon={faSquarePlus} style={style} />,
        collapseAll: <FontAwesomeIcon icon={faSquareMinus} style={style} />,
        parentClose: <FontAwesomeIcon icon={faFolder} style={style} />,
        parentOpen: <FontAwesomeIcon icon={faFolderOpen} style={style} />,
        leaf: "",
      }}
    />
  );
}
