import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import axios from "../../../api/axios";
import useAuth from "../../../hooks/useAuth";
import styles from "../Login.module.css";

export default function LoginForm() {
  const { setAuth, persist, setPersist } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const prevLocation = location.state?.from?.pathname || "/";

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    setErrorMsg("");
  }, [username, password]);

  function togglePersist() {
    setPersist((prev) => !prev);
  }

  useEffect(() => {
    localStorage.setItem("persist", persist);
  }, [persist]);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await axios.post(
        "/login",
        JSON.stringify({ username, password }),
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      const accessToken = response?.data?.accessToken;
      setAuth({ username, password, accessToken });
      setUsername("");
      setPassword("");
      navigate(prevLocation, { replace: true });
    } catch (err) {
      if (!err?.response) {
        setErrorMsg("No response from the server");
      } else if (err.response?.data.message) {
        setErrorMsg(err.response.data.message);
      } else {
        setErrorMsg("Registration failed, please try again");
      }
    }
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <label htmlFor="username" className={styles.username}>
        Username:{" "}
      </label>
      <input
        id="username"
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />

      <label htmlFor="password" className={styles.password}>
        Password:{" "}
      </label>
      <input
        id="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <p className={errorMsg ? "error-msg" : "offscreen"}>{errorMsg}</p>

      <button className={styles.button}>Log in</button>
      <div className={styles.persistCheck}>
        <input
          type="checkbox"
          id="persist"
          onChange={togglePersist}
          checked={persist}
        />
        <label htmlFor="persist">Trust this device?</label>
      </div>
    </form>
  );
}
