import { useEffect, useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import RenderDropdown from "./RenderDropdown/RenderDropdown";
import Thumbnail from "./Thumbnail";

export default function PatternCard({ patternID, thumbnailOptions }) {
  const [patternInfo, setPatternInfo] = useState();
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    async function getPattern() {
      try {
        const response = await axiosPrivate.get(
          `/patterns/filter/${patternID}`,
          {
            signal: controller.signal,
          }
        );

        isMounted && setPatternInfo(response?.data?.pattern || response?.data);
      } catch (err) {
        console.log(err);
      }
    }

    getPattern();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  return (
    <div>
      <div>
        <h5>{patternInfo?.name}</h5>
        <div className="thumbnailContainer">
          <Thumbnail
            pattern={patternInfo}
            urlSize={thumbnailOptions.url}
            style={thumbnailOptions.style}
            maxHeight={thumbnailOptions.maxHeight}
            withLink={thumbnailOptions.withLink}
          />
        </div>
      </div>
      <div className="dropdownContainer">
        <RenderDropdown patternID={patternID} />
      </div>
    </div>
  );
}
