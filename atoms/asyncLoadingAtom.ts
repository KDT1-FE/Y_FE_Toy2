'use client';

import { atom } from 'recoil';

export const asyncLoadingAtom = atom({
	key: 'asyncLoadingAtom',
	default: false,
});
