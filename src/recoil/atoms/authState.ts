import { atom } from "recoil";

export const authState = atom({
  key: "authState",
  default: {
    accessToken: null,
    refreshToken: null,
    isAuthenticated: false,
  },
});
