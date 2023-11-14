import { atom, selector } from 'recoil';

export const accessTokenAtom = atom<string | null>({
  key: 'accessTokenAtom',
  default: null,
});

export const accessTokenSelector = selector({
  key: 'accessTokenSelector',
  get: ({ get }) => {
    const accessToken = get(accessTokenAtom);

    return accessToken;
  },
  set: ({ set }, newValue) => {
    set(accessTokenAtom, newValue);
  },
});
