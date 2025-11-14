import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as faSolid } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import styles from "./Posts.module.css";

export default function Likes({ postID }) {
  const axiosPrivate = useAxiosPrivate();
  const [likes, setLikes] = useState([]);
  const [alreadyLiked, setAlreadyLiked] = useState();

  useEffect(() => {
    const controller = new AbortController();
    let isMounted = true;

    async function checkIfLiked() {
      try {
        const response = await axiosPrivate.get(`/likes/user/${postID}`, {
          signal: controller.signal,
        });
        isMounted && setAlreadyLiked(response?.data ? true : false);
      } catch (error) {
        console.log(error);
      }
    }
    checkIfLiked();
    return () => {
      isMounted = false;
      isMounted && controller.abort();
    };
  }, []);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    async function fetchLikes() {
      try {
        const response = await axiosPrivate.get(`/likes/${postID}`, {
          signal: controller.signal,
        });
        isMounted && setLikes(response?.data?.likedUsers);
      } catch (error) {
        console.log(error);
      }
    }
    fetchLikes();
    return () => {
      isMounted = false;
      isMounted && controller.abort();
    };
  }, [alreadyLiked, postID, axiosPrivate]);

  async function handleClick() {
    const data = { post_id: postID };
    try {
      if (!alreadyLiked) {
        await axiosPrivate.post("/likes", data);
      } else {
        await axiosPrivate.delete("/likes", { data });
      }
      setAlreadyLiked((oldValue) => !oldValue);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <button className={styles.likeButton} onClick={handleClick}>
      <FontAwesomeIcon icon={!alreadyLiked ? faHeart : faSolid} />{" "}
      {likes.length ? likes.length : 0}
    </button>
  );
}
