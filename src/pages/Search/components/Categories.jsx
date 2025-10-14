import { useEffect, useState } from "react";
import "react-checkbox-tree/lib/react-checkbox-tree.css";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import styles from "../Search.module.css";
import Checkbox from "./Checkbox";

export default function Categories({ handleChange }) {
  const [categories, setCategories] = useState();
  const axiosPrivate = useAxiosPrivate();

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
      <h4>Categories</h4>
      {categories && (
        <Checkbox
          node={mapCategories(categories)}
          value="pc"
          handleChange={handleChange}
          expandAll={true}
        />
      )}
    </div>
  );
}
