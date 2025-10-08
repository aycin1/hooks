import { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

export default function FollowButton({ username }) {
  const [buttonText, setButtonText] = useState();
  const [message, setMessage] = useState("");
  const [isFollowing, setIsFollowing] = useState();

  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    async function settingButtonText() {
      try {
        const query = new URLSearchParams({ searchedUser: username });
        const isFollowingUser = await axiosPrivate.get(`/follows/?${query}`, {
          signal: controller.signal,
        });
        if (isFollowingUser.status === 200) {
          isMounted && setIsFollowing(true);
          isMounted && setButtonText("unfollow");
        } else if (isFollowingUser.status === 204) {
          isMounted && setIsFollowing(false);
          isMounted && setButtonText("follow");
        }
      } catch (error) {
        console.log(error);
      }
    }
    settingButtonText();
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [username, message, isFollowing, axiosPrivate]);

  async function handleClick() {
    try {
      let response;
      if (!isFollowing) {
        response = await axiosPrivate.post(
          "/follows/",
          JSON.stringify({ following_user: username })
        );
      } else if (isFollowing) {
        response = await axiosPrivate.delete("/follows/", {
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
