import { useEffect, useState } from "react";
import "react-checkbox-tree/lib/react-checkbox-tree.css";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import styles from "../Search.module.css";
import Checkbox from "./Checkbox";

export default function Attributes({ handleChange }) {
  const [attributes, setAttributes] = useState();
  const axiosPrivate = useAxiosPrivate();

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
      <h4>Attributes</h4>
      {attributes && (
        <Checkbox
          node={sortAttributes(attributes)}
          value="pa"
          handleChange={handleChange}
          expandAll={true}
        />
      )}
    </div>
  );
}
