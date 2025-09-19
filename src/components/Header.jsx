import { Link } from "react-router";

export default function Header() {
  return (
    <div className="headerContainer">
      <Link to={"/"}>Fibre fantasies</Link>
      <div className="headerLinks">
        <Link to={"/profile"}>Profile</Link>

        <Link to={"/lists"}>Lists</Link>

        <Link to={"/search"}>Search</Link>

        <Link to={"/feed"}>Feed</Link>

        <Link to={"/logout"}>Logout</Link>
      </div>
    </div>
  );
}
