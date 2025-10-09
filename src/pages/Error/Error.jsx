import { faFaceSadTear } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router";

export default function Error() {
  return (
    <>
      <h1>404</h1>
      <h3>Uh oh!</h3>
      <pre />
      The page you're looking for isn't here{" "}
      <FontAwesomeIcon icon={faFaceSadTear} beat size="xl" />
      <pre />
      <Link to="/">Back to home</Link>
    </>
  );
}
