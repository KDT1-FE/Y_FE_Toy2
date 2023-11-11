import React, { useCallback, useState, useEffect } from 'react';

const useGetUserInfo = (accessToken: string | null) => {
  const [name, setName] = useState('');

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

    setName(data.user.name);
  }, [accessToken]);

  useEffect(() => {
    getUserInfo();
  }, [getUserInfo]);

  return name;
};

export default useGetUserInfo;
