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

export default function Categories({ catChecked, setCatChecked }) {
  const [categories, setCategories] = useState();
  const axiosPrivate = useAxiosPrivate();
  const [expanded, setExpanded] = useState([]);
  const style = { color: "#2a5a36" };

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    async function fetchCategories() {
      try {
        const response = await axiosPrivate.get("/patterns/categories", {
          signal: controller.signal,
        });
        isMounted && setCategories(response?.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchCategories();
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [axiosPrivate]);

  function mapCategories(categories) {
    return categories?.map((categoryObj) => {
      categoryObj.value = categoryObj.permalink;
      categoryObj.label = categoryObj.name;
      if (categoryObj?.children?.length) {
        mapCategories(categoryObj.children);
      } else {
        delete categoryObj.children;
      }
      return categoryObj;
    });
  }

  return (
    <div className={styles.categories}>
      <h2>Categories</h2>
      {categories && (
        <CheckboxTree
          nodes={mapCategories(categories)}
          checked={catChecked}
          expanded={expanded}
          onCheck={(checked) => setCatChecked(checked)}
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
