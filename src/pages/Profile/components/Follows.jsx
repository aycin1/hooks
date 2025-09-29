import { useEffect, useState } from "react";
import UserLink from "../../../components/UserLink/UserLink";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

export default function Follows() {
  const axiosPrivate = useAxiosPrivate();
  const [users, setUsers] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);

  useEffect(() => {
    async function getFollowers() {
      const response = await axiosPrivate.get("/users/user/followers");
      setFollowers(response.data.followers);
    }
    getFollowers();
  }, []);

  useEffect(() => {
    async function getFollowings() {
      const response = await axiosPrivate.get("/users/user/following");

      setFollowing(response.data.following);
    }
    getFollowings();
  }, []);

  const followersArr = followers.map((follows) => {
    return follows.username;
  });
  const followingArr = following.map((follows) => follows.following_user);
  const followerCount = followers.length ? followers.length : 0;
  const followingCount = following.length ? following.length : 0;
  const follows = { followers: followersArr, following: followingArr };

  async function handleSubmit(e) {
    e.preventDefault();
    setUsers(follows[e.target.name]);
  }

  function mapUsers() {
    return Object.values(users).map((user) => {
      return <UserLink key={user} foundUser={user} />;
    });
  }

  return (
    <div>
      <div className="followsContainer">
        <form name="followers" onSubmit={handleSubmit}>
          <button className="" type="submit">
            {JSON.stringify(followerCount) + " followers"}
          </button>
        </form>
        <form name="following" onSubmit={handleSubmit}>
          <button className="" type="submit">
            {JSON.stringify(followingCount) + " following"}
          </button>
        </form>
      </div>
      <div className="users">{users ? mapUsers() : ""}</div>
    </div>
  );
}
