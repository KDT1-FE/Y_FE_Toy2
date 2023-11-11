import { atom } from "recoil";

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
}

export const authState = atom<AuthState>({
  key: "authState",
  default: {
    accessToken: null,
    refreshToken: null,
    isAuthenticated: false,
  },
});
