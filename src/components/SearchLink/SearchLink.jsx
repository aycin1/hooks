import { NavLink } from "react-router";

export default function SearchLink({ children, className }) {
  return (
    <NavLink to="/search" className={className}>
      {children}
    </NavLink>
  );
}
