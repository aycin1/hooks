import { useParams } from "react-router";
import useFetchPattern from "../hooks/useFetchPattern";
import Thumbnail from "./Thumbnail";

export default function PatternPage() {
  const { id } = useParams();
  const pattern = useFetchPattern(id);

  function setProperties() {
    return {
      name: pattern?.name,
      notes: pattern?.notes_html,
      craft: pattern?.craft?.name,
      needleSizes: pattern?.pattern_needle_sizes[0],
      currency: pattern?.currency,
      price: pattern?.price,
      isFree: pattern?.free,
      patternType: pattern?.pattern_type.name,
      yardage: pattern?.yardage,
      gauge: pattern?.gauge_description,
      category: pattern?.pattern_categories,
      weight: pattern?.yarn_weight_description,
      author: pattern?.pattern_author?.name,
      downloadable: pattern?.downloadable,
      downloadLocation: pattern?.download_location?.url,
    };
  }

  const properties = setProperties();

  function setPatternUrl() {
    return pattern?.url === "" &&
      pattern?.printings[0]?.pattern_source?.url !== ""
      ? (properties.url = pattern.printings[0].pattern_source.url)
      : pattern?.url === "" && pattern?.printings[0]?.pattern_source?.url === ""
      ? (properties.source = {
          name: pattern?.printings[0]?.pattern_source?.name,
          type: pattern?.printings[0]?.pattern_source?.pattern_source_type
            ?.long_name,
        })
      : (properties.url = pattern?.url);
  }

  function linkToPattern() {
    setPatternUrl();
    if (properties.url) {
      return (
        <div className="pattern-link">
          <a href={properties.url}>Pattern</a> by {properties.author}
        </div>
      );
    } else {
      return (
        <div className="pattern-source-details">
          {properties.source?.name} ({properties.source?.type.toLowerCase()}) by
          {properties.author}
        </div>
      );
    }
  }
  const thumbnailOptions = {
    urlSize: "medium2_url",
    style: {
      width: "100%",
      height: "auto",
      maxWidth: "500px",
      minWidth: "500px",
    },
    maxHeight: "800px",
    withLink: false,
  };

  return (
    <div>
      <h3>{properties?.name}</h3>
      {linkToPattern()}
      <Thumbnail pattern={pattern} thumbnailOptions={thumbnailOptions} />
      <div dangerouslySetInnerHTML={{ __html: properties?.notes }} />
    </div>
  );
}
