import { useRecoilState } from "recoil";
import { authState } from "../recoil/atoms/authState";
import { userState } from "../recoil/atoms/userState";

export const useAuth = () => {
  const [auth, setAuth] = useRecoilState(authState); //사용자 인증 상태
  const [user, setUser] = useRecoilState(userState); //사용자 정보
  const setToken = (
    accessToken: string,
    refreshToken: string,
    userId: string,
  ) => {
    return new Promise<void>((resolve) => {
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("userId", userId);
      setAuth({
        accessToken,
        refreshToken,
        isAuthenticated: true,
      });
      setUser({ id: userId, isLoggedIn: true });
      resolve();
    });
  };

  // 로그아웃
  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("userId");
    setAuth({
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
    });
  };

  // 새로운 액세스 토큰 받아옴
  const refreshAccessToken = async () => {
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      if (!refreshToken) {
        throw new Error("No refresh token available");
      }

      const response = await fetch("https://fastcampus-chat.net/refresh", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refreshToken }),
      });

      const data = await response.json();
      if (response.ok && data.accessToken) {
        setToken(data.accessToken, refreshToken, data.userId); // 새로운 토큰으로 상태 업데이트
      } else {
        throw new Error("Failed to refresh token");
      }
    } catch (error) {
      console.error("Token refresh error:", error);
      // 에러 핸들링 추가해야함.
    }
  };

  return { auth, user, setToken, logout, refreshAccessToken };
};
