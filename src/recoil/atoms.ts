import { atom } from "recoil";
export const idState = atom<string>({
  key: "idState",
  default: "",
});

export const pwState = atom<string>({
  key: "pwState",
  default: "",
});

export const profileImageState = atom<File | undefined>({
  key: "profileImageState",
  default: undefined,
});

export const userNameState = atom<string>({
  key: "userNameState",
  default: "",
});

export const birthdayState = atom<Date | null>({
  key: "birthdayState",
  default: null,
});

export const selectedGenderState = atom<string>({
  key: "selectedGenderState",
  default: "",
});

export const selectedRegionState = atom<string>({
  key: "selectedRegionState",
  default: "",
});

export const jobState = atom<string>({
  key: "jobState",
  default: "",
});

export const tallState = atom<string>({
  key: "tallState",
  default: "",
});

export const smokingState = atom<boolean | null>({
  key: "smokingStae",
  default: null,
});

export const alcholState = atom<string>({
  key: "alcholState",
  default: "",
});

export const mbtiState = atom<string>({
  key: "mbtiState",
  default: "",
});

export const loginState = atom({
  key: "loginState",
  default: false,
});
