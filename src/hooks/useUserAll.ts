import React, { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const useUserAll = (accessToken: string | null) => {
  const [userAllList, setUserAllList] = useState([]);
  const userAll = useCallback(async () => {
    try {
      const response = await fetch('https://fastcampus-chat.net/users', {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
          serverId: '9b9a6496',
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setUserAllList(data);
    } catch (error) {
      if (error instanceof Error) toast.error(error.message);
    }
  }, [accessToken]);

  useEffect(() => {
    userAll();
  }, [userAll]);

  return userAllList;
};

export default useUserAll;
