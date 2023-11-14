import React, { useCallback, useEffect, useState } from 'react';

const useUserAll = (accessToken: string | null) => {
  const [userAllList, setUserAllList] = useState([]);
  const userAll = useCallback(async () => {
    const response = await fetch('https://fastcampus-chat.net/users', {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        serverId: '9b9a6496',
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const data = await response.json();
    setUserAllList(data);
  }, [accessToken]);

  useEffect(() => {
    userAll();
  }, [userAll]);

  return userAllList;
};

export default useUserAll;
