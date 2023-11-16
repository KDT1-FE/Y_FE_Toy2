import { atom } from "recoil";

export interface UserState {
  id: string | null;
  isLoggedIn: boolean;
}

export const userState = atom<UserState>({
  key: "userState",
  default: {
    id: localStorage.getItem("userId") || "",
    isLoggedIn: false,
  },
});
