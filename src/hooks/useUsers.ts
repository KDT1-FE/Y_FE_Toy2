import { useQuery } from '@tanstack/react-query';
import { ALL_USERS } from '../constants/user';
import { getUsers } from '../api/user';
import { useState } from 'react';

export const useUsers = () => {
  const { data, isLoading } = useQuery({
    queryKey: ALL_USERS,
    queryFn: getUsers,
  });

  const [userList, setUserList] = useState<string[]>([]);

  const addUser = (userId: string) => {
    setUserList((currentUserList) => {
      const isExist = currentUserList.find((user) => user === userId);
      if (isExist) {
        return currentUserList.filter((user) => user !== userId);
      }
      return [...currentUserList, userId];
    });
  };

  return { data, isLoading, addUser, userList };
};
