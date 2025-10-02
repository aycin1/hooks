// import {
//   faChevronDown,
//   faChevronRight,
//   faFolder,
//   faFolderOpen,
//   faMinusSquare,
//   faPlusSquare,
//   faSquare,
//   faSquareCheck,
// } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
// import CheckboxTree from "react-checkbox-tree";
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
        const response = await axiosPrivate.get("/patterns/attributes");
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
  }, []);

  function mapAttributes(attribute) {
    return attribute?.pattern_attributes?.map((attribute) => {
      return (
        <div>
          <input type="checkbox" id={attribute.id} />
          <label htmlFor={attribute.id}>{attribute.name}</label>
        </div>
      );
    });
  }

  function sortAttributes(attributes) {
    if (attributes?.length) {
      return attributes.map((attribute) => {
        return (
          <>
            <h4>{attribute.name}</h4>
            {attribute.pattern_attributes[0].name === "placeholder" ? (
              sortAttributes(attribute.children)
            ) : attribute.children?.length ? (
              <>
                {mapAttributes(attribute)}
                {sortAttributes(attribute.children)}
              </>
            ) : (
              mapAttributes(attribute)
            )}
          </>
        );
      });
    }
  }

  return (
    <div className={styles.attributes}>
      <h2>Attributes</h2>
      {
        attributes && console.log(attributes)
        // (
        //   <CheckboxTree
        //     nodes={sortAttributes(attributes)}
        //     onlyLeafCheckboxes={true}
        //     checked={attChecked}
        //     expanded={expanded}
        //     onCheck={(checked) => setAttChecked(checked)}
        //     onExpand={(expanded) => setExpanded(expanded)}
        //     icons={{
        //       check: (
        //         <FontAwesomeIcon
        //           icon={faSquareCheck}
        //           style={{ color: "#709c62ff" }}
        //         />
        //       ),
        //       uncheck: (
        //         <FontAwesomeIcon icon={faSquare} style={{ color: "#709c62ff" }} />
        //       ),
        //       expandClose: (
        //         <FontAwesomeIcon icon={faChevronRight} style={style} />
        //       ),
        //       expandOpen: <FontAwesomeIcon icon={faChevronDown} style={style} />,
        //       expandAll: <FontAwesomeIcon icon={faPlusSquare} style={style} />,
        //       collapseAll: <FontAwesomeIcon icon={faMinusSquare} style={style} />,
        //       parentClose: <FontAwesomeIcon icon={faFolder} style={style} />,
        //       parentOpen: <FontAwesomeIcon icon={faFolderOpen} style={style} />,
        //       leaf: "",
        //     }}
        //   />
        // )
      }
    </div>
  );
  // return attributes?.length && sortAttributes(attributes);
}
