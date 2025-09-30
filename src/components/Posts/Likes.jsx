import { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import styles from "./Posts.module.css";

export default function Likes({ postID }) {
  const axiosPrivate = useAxiosPrivate();
  const [likes, setLikes] = useState([]);
  const [alreadyLiked, setAlreadyLiked] = useState();

  useEffect(() => {
    async function checkLikes() {
      try {
        const response = await axiosPrivate.get(`/likes/user/${postID}`);
        setAlreadyLiked(response?.data ? true : false);
      } catch (error) {
        console.log(error);
      }
    }
    checkLikes();
  }, [postID]);

  useEffect(() => {
    async function fetchLikes() {
      try {
        const response = await axiosPrivate.get(`/likes/${postID}`);
        setLikes(response?.data?.likedUsers);
      } catch (error) {
        console.log(error);
      }
    }
    fetchLikes();
  }, [alreadyLiked, postID]);

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
    <button className={styles.likeButton} onClick={() => handleClick()}>
      {likes.length ? likes.length : 0}
    </button>
  );
}
