import axios from "../api/axios";
import useAuth from "./useAuth";

export default function useRefreshToken() {
  const { setAuth } = useAuth();

  async function refresh() {
    const response = await axios.get("/refresh", { withCredentials: true });
    setAuth((prev) => {
      console.log(response.data.accessToken);
      return { ...prev, accessToken: response.data.accessToken };
    });

    return response.data.accessToken;
  }

  return refresh;
}
