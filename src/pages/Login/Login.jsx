import { NavLink } from "react-router";
import LoginForm from "./components/LoginForm";
import styles from "./Login.module.css";
export default function Login() {
  return (
    <div className={styles.login}>
      <h1>Sign in</h1>

      <LoginForm />

      <div className={styles.registrationLink}>
        Need an account?
        <br />
        <NavLink to="/register" className={styles.link}>
          Click here to register
        </NavLink>
      </div>
    </div>
  );
}
