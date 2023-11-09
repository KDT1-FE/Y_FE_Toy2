import { atom } from 'recoil';

export const chatModalAtom = atom({
	key: 'chatModalAtom',
	default: false,
});

export const chatModalUserSearchAtom = atom({
	key: 'chatModalUserSearchAtom',
	default: false,
});
