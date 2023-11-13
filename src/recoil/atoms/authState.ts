import { atom } from "recoil";

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
}

export const authState = atom<AuthState>({
  key: "authState",
  default: {
    accessToken: localStorage.getItem("accessToken"),
    refreshToken: localStorage.getItem("refreshToken"),
    isAuthenticated: !!localStorage.getItem("accessToken"),
  },
});
