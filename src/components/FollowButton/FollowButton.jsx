import { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

export default function FollowButton({ username }) {
  const [buttonText, setButtonText] = useState();
  const [message, setMessage] = useState("");
  const [isFollowing, setIsFollowing] = useState();

  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    async function settingButtonText() {
      try {
        const isFollowingUser = await axiosPrivate.get(
          `/users/isFollowing/${username}`
        );

        if (isFollowingUser.status === 200) {
          setIsFollowing(true);
          setButtonText("unfollow");
        } else if (isFollowingUser.status === 204) {
          setIsFollowing(false);
          setButtonText("follow");
        }
      } catch (error) {
        console.log(error);
      }
    }
    settingButtonText();
  }, [username, message, isFollowing]);

  async function handleClick() {
    try {
      let response;
      if (!isFollowing) {
        response = await axiosPrivate.post(
          "/users/",
          JSON.stringify({ following_user: username })
        );
      } else if (isFollowing) {
        response = await axiosPrivate.delete("/users/", {
          data: JSON.stringify({ unfollowing_user: username }),
        });
      }
      if (response?.data?.message) {
        setMessage(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <button
        style={{ fontSize: "smaller", marginLeft: "10px" }}
        onClick={(e) => handleClick(e)}
      >
        {buttonText}
      </button>
    </>
  );
}
