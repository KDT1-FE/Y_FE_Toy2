import React, { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { accessTokenState } from '../atoms';

const useLogout = () => {
  const setAccessToken = useSetRecoilState(accessTokenState);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');

    setAccessToken('');
  };

  return handleLogout;
};

export default useLogout;
