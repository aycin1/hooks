import axios from "../api/axios";
import useAuth from "./useAuth";

export default function useLogout() {
  const { setAuth } = useAuth();

  async function logout() {
    setAuth({});
    try {
      await axios("/logout", { withCredentials: true });
    } catch (error) {
      console.error(error);
    }
  }

  return logout;
}
