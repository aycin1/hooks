import { NavLink } from "react-router";
import RegistrationForm from "./components/RegistrationForm";
import styles from "./Register.module.css";

export default function Register() {
  return (
    <div className={styles.register}>
      <h1>Register</h1>

      <RegistrationForm />

      <div className={styles.loginLink}>
        Already registered?
        <br />
        <NavLink to="/login">Click here to sign in</NavLink>
      </div>
    </div>
  );
}
