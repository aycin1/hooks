import { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

export default function FollowButton({ username, style }) {
  const [isFollowing, setIsFollowing] = useState();
  const axiosPrivate = useAxiosPrivate();
  const [message, setMessage] = useState("");

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    async function checkIfFollowing() {
      try {
        const query = new URLSearchParams({ searchedUser: username });
        const isFollowingUser = await axiosPrivate.get(`/follows/?${query}`, {
          signal: controller.signal,
        });
        if (isFollowingUser.status === 200) {
          isMounted && setIsFollowing(true);
        } else if (isFollowingUser.status === 204) {
          isMounted && setIsFollowing(false);
        }
      } catch (error) {
        console.log(error);
      }
    }
    checkIfFollowing();
    return () => {
      isMounted = false;
      isMounted && controller.abort();
    };
  }, [username, message, axiosPrivate]);

  async function handleClick() {
    try {
      let response;
      if (!isFollowing) {
        response = await axiosPrivate.post("/follows/", {
          following_user: username,
        });
      } else {
        response = await axiosPrivate.delete("/follows/", {
          data: { unfollowing_user: username },
        });
      }
      setMessage(response?.data?.message);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <button
        style={{ fontSize: "smaller", marginLeft: "10px", ...style }}
        onClick={handleClick}
      >
        {isFollowing ? "unfollow" : "follow"}
      </button>
    </>
  );
}
