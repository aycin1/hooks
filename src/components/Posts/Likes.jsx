import { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import styles from "./Posts.module.css";

export default function Likes({ postID }) {
  const axiosPrivate = useAxiosPrivate();
  const [likes, setLikes] = useState([]);
  const [alreadyLiked, setAlreadyLiked] = useState();

  useEffect(() => {
    let isMounted = true;
    async function checkIfLiked() {
      try {
        const response = await axiosPrivate.get(`/likes/user/${postID}`);
        isMounted && setAlreadyLiked(response?.data ? true : false);
      } catch (error) {
        console.log(error);
      }
    }
    checkIfLiked();
    return () => (isMounted = false);
  }, []);

  useEffect(() => {
    let isMounted = true;
    async function fetchLikes() {
      try {
        const response = await axiosPrivate.get(`/likes/${postID}`);
        isMounted && setLikes(response?.data?.likedUsers);
      } catch (error) {
        console.log(error);
      }
    }
    fetchLikes();
    return () => (isMounted = false);
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
      {likes.length ? likes.length : 0}
    </button>
  );
}
