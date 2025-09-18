import { Link } from "react-router";

export default function Header() {
  return (
    <div className="headerContainer">
      <Link to={"/"}>
        <h2 className="headerTitle">Fibre fantasies</h2>
      </Link>
      <div className="headerLinks">
        <div className="links">
          <Link to={`/profile`}>Profile</Link>
        </div>
        <div className="links">
          <Link to={"/lists"}>Lists</Link>
        </div>
        <div className="links">
          <Link to={"/search"}>Search</Link>
        </div>
        <div className="links">
          <Link to={"/feed"}>Feed</Link>
        </div>
        <div className="links">
          <Link to={"/logout"}>Logout</Link>
        </div>
      </div>
    </div>
  );
}
