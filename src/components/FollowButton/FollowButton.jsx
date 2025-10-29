import { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

export default function FollowButton({ username }) {
  const [isFollowing, setIsFollowing] = useState();
  const axiosPrivate = useAxiosPrivate();

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
      controller.abort();
    };
  }, [username, axiosPrivate]);

  async function handleClick() {
    try {
      if (!isFollowing) {
        await axiosPrivate.post(
          "/follows/",
          JSON.stringify({ following_user: username })
        );
      } else {
        await axiosPrivate.delete("/follows/", {
          data: JSON.stringify({ unfollowing_user: username }),
        });
      }
      setIsFollowing((prev) => !prev);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <button
        style={{ fontSize: "smaller", marginLeft: "10px" }}
        onClick={handleClick}
      >
        {isFollowing ? "unfollow" : "follow"}
      </button>
    </>
  );
}
