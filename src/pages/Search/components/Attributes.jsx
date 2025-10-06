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
import { useEffect, useState } from "react";
import CheckboxTree from "react-checkbox-tree";
import "react-checkbox-tree/lib/react-checkbox-tree.css";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import styles from "../Search.module.css";

export default function Attributes({ attChecked, setAttChecked }) {
  const [attributes, setAttributes] = useState();
  const axiosPrivate = useAxiosPrivate();
  const [expanded, setExpanded] = useState([]);
  const style = { color: "#2a5a36" };

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    async function fetchAttributes() {
      try {
        const response = await axiosPrivate.get("/patterns/attributes", {
          signal: controller.signal,
        });
        isMounted && setAttributes(response?.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchAttributes();
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [axiosPrivate]);

  function sortAttributes(attributes) {
    return attributes?.map((attributeObj, index) => {
      attributeObj.value = attributeObj.permalink || attributeObj.id;
      attributeObj.label = attributeObj.name;
      if (attributeObj?.pattern_attributes?.[0]?.name === "placeholder") {
        delete attributeObj.pattern_attributes;
        attributes.splice(index, 1);
        attributeObj?.children?.map((child) => {
          return attributes.unshift(child);
        });
      } else if (
        !attributeObj?.children?.length &&
        attributeObj?.pattern_attributes
      ) {
        attributeObj.children = attributeObj?.pattern_attributes;
        delete attributeObj.pattern_attributes;
        sortAttributes(attributeObj.children);
      } else if (attributeObj?.children) {
        const newChildren = attributeObj.children;
        attributeObj?.pattern_attributes?.map((att) => {
          return newChildren.push(att);
        });
        attributeObj.children = newChildren;
        delete attributeObj.pattern_attributes;
        sortAttributes(attributeObj.children);
      }
      return attributeObj;
    });
  }

  return (
    <div className={styles.attributes}>
      <h2>Attributes</h2>
      {attributes && (
        <CheckboxTree
          nodes={sortAttributes(attributes)}
          onlyLeafCheckboxes={true}
          checked={attChecked}
          expanded={expanded}
          onCheck={(checked) => setAttChecked(checked)}
          onExpand={(expanded) => setExpanded(expanded)}
          showExpandAll={true}
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
            expandClose: (
              <FontAwesomeIcon icon={faChevronRight} style={style} />
            ),
            expandOpen: <FontAwesomeIcon icon={faChevronDown} style={style} />,
            expandAll: <FontAwesomeIcon icon={faPlusSquare} style={style} />,
            collapseAll: <FontAwesomeIcon icon={faMinusSquare} style={style} />,
            parentClose: <FontAwesomeIcon icon={faFolder} style={style} />,
            parentOpen: <FontAwesomeIcon icon={faFolderOpen} style={style} />,
            leaf: "",
          }}
        />
      )}
    </div>
  );
}
