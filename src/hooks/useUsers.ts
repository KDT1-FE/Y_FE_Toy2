import { useQuery } from '@tanstack/react-query';
import { ALL_USERS } from '../constants/user';
import { getUsers } from '../api/user';
import { useState } from 'react';

export const useUsers = () => {
  const { data, isLoading } = useQuery({
    queryKey: ALL_USERS,
    queryFn: getUsers,
    staleTime: 1000 * 60,
  });

  const [userSet, setUserSet] = useState<Set<string>>(new Set());

  const addUser = (userId: string) => {
    setUserSet((currentUserSet) => {
      const newSet = new Set(currentUserSet);
      if (newSet.has(userId)) {
        newSet.delete(userId);
      } else {
        newSet.add(userId);
      }
      return newSet;
    });
  };

  return { data, isLoading, addUser, userSet };
};
