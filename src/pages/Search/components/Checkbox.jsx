import {
  faChevronDown,
  faChevronRight,
  faFolder,
  faFolderOpen,
  faMinusSquare,
  faPlusSquare,
  faSquare,
  faSquareCheck,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import CheckboxTree from "react-checkbox-tree";
import "react-checkbox-tree/lib/react-checkbox-tree.css";

export default function Checkbox({ node, checked, setChecked, expandAll }) {
  const [expanded, setExpanded] = useState([]);
  const style = { color: "#2a5a36" };

  return (
    <CheckboxTree
      nodes={node}
      onlyLeafCheckboxes={true}
      checked={checked}
      expanded={expanded}
      onCheck={(checked) => setChecked(checked)}
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
        expandAll: <FontAwesomeIcon icon={faPlusSquare} style={style} />,
        collapseAll: <FontAwesomeIcon icon={faMinusSquare} style={style} />,
        parentClose: <FontAwesomeIcon icon={faFolder} style={style} />,
        parentOpen: <FontAwesomeIcon icon={faFolderOpen} style={style} />,
        leaf: "",
      }}
    />
  );
}
