import { useEffect, useState } from "react";
import { axiosPrivate } from "../../../api/axios";

export default function RefineSearch() {
  const [attributes, setAttributes] = useState();
  const [categories, setCategories] = useState();

  useEffect(() => {
    async function fetchAttributes() {
      const response = await axiosPrivate.get("/patterns/attributes");
      setAttributes(response.data);
    }
    fetchAttributes();
  }, []);

  useEffect(() => {
    async function fetchCategories() {
      const response = await axiosPrivate.get("/patterns/categories");
      setCategories(response.data);
    }
    fetchCategories();
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
    console.log(attributes);
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

  return <>{attributes?.length ? sortAttributes(attributes) : ""}</>;
}
