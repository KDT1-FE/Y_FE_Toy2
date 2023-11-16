'use client';

import { useSetRecoilState } from 'recoil';
import { asyncLoadingAtom } from '@/atoms/asyncLoadingAtom';

const useAsyncLoading = () => {
	const loadingControl = useSetRecoilState(asyncLoadingAtom);

	return loadingControl;
};

export default useAsyncLoading;
