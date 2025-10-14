import { useParams } from "react-router";
import RenderDropdown from "../../components/RenderDropdown/RenderDropdown";
import Thumbnail from "../../components/Thumbnail/Thumbnail";
import usePattern from "../../hooks/usePattern";

export default function Pattern() {
  const { id } = useParams();
  const pattern = usePattern(id);

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

  function setPatternUrl(properties) {
    return (properties =
      pattern?.url === "" && pattern?.printings[0]?.pattern_source?.url !== ""
        ? { ...properties, url: pattern.printings[0].pattern_source.url }
        : pattern?.url === "" &&
          pattern?.printings[0]?.pattern_source?.url === ""
        ? {
            ...properties,
            source: {
              name: pattern?.printings[0]?.pattern_source?.name,
              type: pattern?.printings[0]?.pattern_source?.pattern_source_type
                ?.long_name,
            },
          }
        : { ...properties, url: pattern?.url });
  }

  function linkToPattern(properties) {
    setPatternUrl(properties);
    if (properties.url) {
      return (
        <div>
          <a href={properties.url}>Pattern</a> by {properties.author}
        </div>
      );
    } else {
      return (
        <div>
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
  };

  return (
    <div>
      <h3>{properties?.name}</h3>
      {linkToPattern(properties)}
      <RenderDropdown patternID={id} />
      <Thumbnail patternID={id} thumbnailOptions={thumbnailOptions} />
      <div dangerouslySetInnerHTML={{ __html: properties?.notes }} />
    </div>
  );
}
