import { useMutation } from '@tanstack/react-query';
import { checkId, join } from '../api/join';

export const useCheckId = () => {
  return useMutation({ mutationFn: checkId });
};

export const useJoin = () => {
  return useMutation({ mutationFn: join });
};
