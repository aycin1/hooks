import { useParams } from "react-router";
import Dropdown from "../../components/Dropdown/Dropdown";
import Thumbnail from "../../components/Thumbnail/Thumbnail";
import usePattern from "../../hooks/usePattern";
import PatternLink from "./components/PatternLink";
import styles from "./Pattern.module.css";

export default function Pattern() {
  const { id } = useParams();
  const pattern = usePattern(id);

  const thumbnailOptions = {
    urlSize: "medium2_url",
    style: {
      width: "100%",
      height: "auto",
      maxWidth: "450px",
      minWidth: "450px",
    },
    maxHeight: "800px",
  };

  return (
    <div>
      <h3>{pattern?.name}</h3>

      <div className={styles.container}>
        <div className={styles.lhs}>
          <div className={styles.linkAndDropdown}>
            <PatternLink patternID={id} />
            <Dropdown patternID={id} />
          </div>
          <div>
            <table className={styles.table}>
              <tbody>
                <tr>
                  <th scope="row" className={styles.th}>
                    Price
                  </th>
                  <td className={styles.td}>
                    {!pattern?.isFree
                      ? `${pattern?.price} ${pattern?.currency}`
                      : "Free!"}
                  </td>
                </tr>
                <tr>
                  <th scope="row" className={styles.th}>
                    Craft
                  </th>
                  <td className={styles.td}>{pattern?.craft}</td>
                </tr>
                <tr>
                  <th scope="row" className={styles.th}>
                    Weight
                  </th>
                  <td className={styles.td}>{pattern?.weight}</td>
                </tr>
                {pattern?.yardage && (
                  <tr>
                    <th scope="row" className={styles.th}>
                      Yardage
                    </th>
                    <td className={styles.td}>{pattern?.yardageDescription}</td>
                  </tr>
                )}
                {pattern?.needleSizes?.length > 0 && (
                  <tr>
                    <th scope="row" className={styles.th}>
                      {pattern?.craft === "crochet"
                        ? "Hook size"
                        : "Needle size"}
                    </th>
                    <td className={styles.td}>
                      {pattern?.needleSizes?.map((size, i) => (
                        <div key={i}>{size?.name}</div>
                      ))}
                    </td>
                  </tr>
                )}
                {pattern?.gauge && (
                  <tr>
                    <th scope="row" className={styles.th}>
                      Gauge
                    </th>
                    <td className={styles.td}>{pattern?.gaugeDescription}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        <div>
          <Thumbnail patternID={id} thumbnailOptions={thumbnailOptions} />
        </div>
      </div>

      <div dangerouslySetInnerHTML={{ __html: pattern?.notes }} />
    </div>
  );
}
