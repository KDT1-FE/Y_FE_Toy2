import React, { useCallback, useState, useEffect } from 'react';

export type UserInfo = {
  id: string;
  name: string;
  picture: string;
};

const useGetUserInfo = (accessToken: string | null) => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  const getUserInfo = useCallback(async () => {
    const response = await fetch('https://fastcampus-chat.net/auth/me', {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        serverId: '9b9a6496',
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const data = await response.json();

    setUserInfo(data.user);
  }, [accessToken]);

  useEffect(() => {
    getUserInfo();
  }, [getUserInfo]);

  return userInfo;
};

export default useGetUserInfo;
