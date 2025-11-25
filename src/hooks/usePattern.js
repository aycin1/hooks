import { useEffect, useState } from "react";
import useAxiosPrivate from "./useAxiosPrivate";

export default function usePattern(patternID) {
  const [pattern, setPattern] = useState();
  const [properties, setProperties] = useState();
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    async function getPattern() {
      try {
        const response = await axiosPrivate.get(
          `/patterns/filter/${patternID}`
        );
        isMounted && setPattern(response?.data?.pattern);
      } catch (error) {
        console.log(error);
      }
    }

    getPattern();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [patternID, axiosPrivate]);

  useEffect(() => {
    pattern &&
      setProperties({
        name: pattern?.name,
        notes: pattern?.notes_html,
        craft: pattern?.craft?.name,
        needleSizes: pattern?.pattern_needle_sizes,
        yardage: pattern?.yardage,
        yardageDescription: pattern?.yardage_description,
        gauge: pattern?.gauge,
        gaugeDescription: pattern?.gauge_description,
        currency: pattern?.currency,
        price: pattern?.price,
        isFree: pattern?.free,
        patternType: pattern?.pattern_type?.name,
        category: pattern?.pattern_categories,
        weight: pattern?.yarn_weight_description,
        author: pattern?.pattern_author?.name,
        downloadable: pattern?.downloadable,
        downloadLocation: pattern?.download_location?.url,
        difficulty: pattern?.difficulty_average,
        photos: pattern?.photos,
        url:
          pattern?.url === "" &&
          pattern?.printings[0]?.pattern_source?.url !== ""
            ? pattern.printings[0].pattern_source.url
            : pattern?.url,
        source:
          pattern?.url === "" &&
          pattern?.printings[0]?.pattern_source?.url === ""
            ? {
                name: pattern?.printings[0]?.pattern_source?.name,
                type: pattern?.printings[0]?.pattern_source?.pattern_source_type
                  ?.long_name,
              }
            : "",
      });
  }, [pattern]);

  return properties;
}
