import { useQuery } from '@tanstack/react-query';
import { getUser } from '../api/user';
import { User } from '../@types/user';

export const useUser = (userId: string) => {
  return useQuery<User>({
    queryKey: ['user', userId],
    queryFn: async () => getUser(userId),
    staleTime: 1000 * 60,
  });
};
