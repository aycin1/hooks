import {
  faCheck,
  faInfoCircle,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router";
import axios from "./api/axios";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{4,22}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[*^!%$@&]).{8,24}$/;
const REGISTER_URL = "/register";

export default function Register() {
  const navigate = useNavigate();
  const userRef = useRef();
  const errorRef = useRef();

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [username, setUsername] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [password, setPassword] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [pwdConfirm, setPwdConfirm] = useState("");
  const [validConfirm, setValidConfirm] = useState(false);
  const [confirmFocus, setConfirmFocus] = useState(false);

  const [errorMsg, setErrorMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email]);

  useEffect(() => {
    setValidName(USER_REGEX.test(username));
  }, [username]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(password));
    setValidConfirm(password === pwdConfirm);
  }, [password, pwdConfirm]);

  useEffect(() => {
    setErrorMsg("");
  }, [email, username, password, pwdConfirm]);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await axios.post(
        REGISTER_URL,
        JSON.stringify({
          email,
          username,
          password,
        }),
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      setEmail("");
      setUsername("");
      setPassword("");
      setPwdConfirm("");
      setSuccess(true);
    } catch (err) {
      if (!err?.response) {
        setErrorMsg("No response from the server");
      } else if (err.response?.data.message) {
        setErrorMsg(err.response.data.message);
      } else {
        setErrorMsg("Registration failed, please try again");
      }
      errorRef.current.focus();
    }
  }

  return (
    <>
      {success ? (
        <p>Registration successful, navigating to log in page!</p> >
        navigate("/login")
      ) : (
        <div onSubmit={handleSubmit}>
          <h1>Registration</h1>

          <form>
            <label htmlFor="email">
              Email address:
              <FontAwesomeIcon
                icon={faCheck}
                className={validEmail ? "valid" : "hide"}
              />
              <FontAwesomeIcon
                icon={faTimes}
                className={validEmail || !email ? "hide" : "invalid"}
              />
            </label>
            <input
              id="email"
              type="text"
              value={email}
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setEmail(e.target.value)}
              required
              onFocus={() => setEmailFocus(true)}
              onBlur={() => setEmailFocus(false)}
            />
            <p
              className={
                emailFocus && email && !validEmail
                  ? "instructions"
                  : "offscreen"
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              Please enter a valid email address
            </p>

            {/*  */}

            <label htmlFor="username">
              Username:
              <FontAwesomeIcon
                icon={faCheck}
                className={validName ? "valid" : "hide"}
              />
              <FontAwesomeIcon
                icon={faTimes}
                className={validName || !username ? "hide" : "invalid"}
              />
            </label>
            <input
              id="username"
              type="text"
              value={username}
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setUsername(e.target.value)}
              required
              onFocus={() => setUserFocus(true)}
              onBlur={() => setUserFocus(false)}
            />
            <p
              className={
                userFocus && username && !validName
                  ? "instructions"
                  : "offscreen"
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              Username must be between 5 and 23 characters
              <br />
              Must begin with a letter
              <br />
              Only letters, numbers, underscores, and hyphens allowed.
            </p>

            {/*  */}

            <label htmlFor="password">
              Password:
              <FontAwesomeIcon
                icon={faCheck}
                className={validPwd ? "valid" : "hide"}
              />
              <FontAwesomeIcon
                icon={faTimes}
                className={validPwd || !password ? "hide" : "invalid"}
              />
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              onFocus={() => setPwdFocus(true)}
              onBlur={() => setPwdFocus(false)}
            />
            <p className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
              <FontAwesomeIcon icon={faInfoCircle} />
              Password must be between 8 and 24 characters
              <br />
              Must contain uppercase and lowercase letters, a number,
              <br />
              and a special character (*^!%$@&)
            </p>

            {/*  */}

            <label htmlFor="password_confirm">
              Confirm password:
              <FontAwesomeIcon
                icon={faCheck}
                className={validConfirm && pwdConfirm ? "valid" : "hide"}
              />
              <FontAwesomeIcon
                icon={faTimes}
                className={validConfirm || !pwdConfirm ? "hide" : "invalid"}
              />
            </label>
            <input
              id="password_confirm"
              type="password"
              value={pwdConfirm}
              onChange={(e) => setPwdConfirm(e.target.value)}
              required
              onFocus={() => setConfirmFocus(true)}
              onBlur={() => setConfirmFocus(false)}
            />
            <p
              className={
                confirmFocus && !validConfirm ? "instructions" : "offscreen"
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              Passwords must match
            </p>

            {/*  */}

            <p ref={errorRef} className={errorMsg ? "error-msg" : "offscreen"}>
              {errorMsg}
            </p>

            {/*  */}

            <button
              disabled={
                !validEmail || !validName || !validPwd || !validConfirm
                  ? true
                  : false
              }
            >
              Register
            </button>
          </form>

          <div className="login_link">
            Already registered?
            <br />
            <NavLink to="/login">Click here to sign in</NavLink>
          </div>
        </div>
      )}
    </>
  );
}
