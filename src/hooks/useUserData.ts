import { useState, useEffect } from 'react';
import { getAllUsers } from '../api/user';

export const useUserData = () => {
  const [userData, setUserData] = useState<{
    totalUsers: number;
    userNames: string[];
    profilePictures: string[];
  }>({
    totalUsers: 0,
    userNames: [],
    profilePictures: [],
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const usersData = await getAllUsers();
        setUserData(usersData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserData();
  }, []);

  return userData;
};
