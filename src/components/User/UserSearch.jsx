import { useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import UserFollow from "./UserFollow";

export default function UserSearch() {
  const [searchField, setSearchField] = useState();
  const [foundUser, setFoundUser] = useState();
  const axiosPrivate = useAxiosPrivate();

  async function handleSubmit(e) {
    e.preventDefault();
    const response = await axiosPrivate.get(`/users/${searchField}`);
    setFoundUser(response.data.username);
  }

  return (
    <div className="searchUserContainer">
      <form onSubmit={handleSubmit}>
        <div className="searchInput">
          <input
            className="input"
            type="text"
            placeholder="  Username"
            onChange={(e) => setSearchField(e.target.value)}
          />
          <button className="userSearchButton">Search</button>
        </div>
      </form>
      <div className="userComponent">
        {foundUser ? <UserFollow foundUser={foundUser} /> : ""}
      </div>
    </div>
  );
}
