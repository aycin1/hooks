import { useEffect, useState } from "react";
import { Link } from "react-router";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

export default function UserLink({ foundUser }) {
  const [buttonText, setButtonText] = useState();
  const [message, setMessage] = useState("");
  const [isFollowing, setIsFollowing] = useState();

  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    async function settingButtonText() {
      const isFollowingUser = await axiosPrivate.get(
        `/users/isFollowing/${foundUser}`
      );
      console.log(isFollowingUser);
      if (isFollowingUser.status === 200) {
        setIsFollowing(true);
        setButtonText("unfollow");
      } else if (isFollowingUser.status === 204) {
        setIsFollowing(false);
        setButtonText("follow");
      }
    }
    settingButtonText();
  }, [foundUser, message, isFollowing]);

  async function handleClick() {
    if (!isFollowing) {
      const response = await axiosPrivate.post(
        "/users/",
        JSON.stringify({ following_user: foundUser })
      );

      if (response?.data?.message) {
        setMessage(response.data.message);
      }
    } else if (isFollowing) {
      const response = await axiosPrivate.delete("/users/", {
        data: JSON.stringify({ unfollowing_user: foundUser }),
      });

      if (response?.data?.message) {
        setMessage(response.data.message);
      }
    }
  }

  return (
    <div className="userLinkContainer">
      <Link to={`/user/${foundUser}`}>{foundUser}</Link>
      <button className="followButton" onClick={(e) => handleClick(e)}>
        {buttonText}
      </button>
      {message}
    </div>
  );
}
