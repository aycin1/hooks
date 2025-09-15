import { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router";
import axios from "../api/axios";
import useAuth from "../hooks/useAuth";

const LOGIN_ENDPOINT = "/login";

export default function Login() {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const prevLocation = location.state?.from?.pathname || "/";

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    setErrorMsg("");
  }, [username, password]);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await axios.post(
        LOGIN_ENDPOINT,
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
    <div className="login-form-wrapper">
      <div className="login-form-container">
        <h1>Log in</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Username: </label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          {/*  */}

          <label htmlFor="password">Password: </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {/*  */}

          <button>Log in</button>
        </form>
      </div>

      {/*  */}

      <p
        //   ref={errorRef}
        className={errorMsg ? "error-msg" : "offscreen"}
      >
        {errorMsg}
      </p>

      {/*  */}

      <div className="registration_link">
        Need an account?
        <br />
        <NavLink to="/register">Click here to register</NavLink>
      </div>
    </div>
  );
}
