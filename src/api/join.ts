import { JoinInfo } from '../@types/join';
import instance from './axios';

export const checkId = async (id: string) => {
  const response = await instance.post<{ isDuplicated: boolean }>('/check/id', {
    id: id,
  });
  return response.data;
};

export const join = async (joinInfo: JoinInfo) => {
  const response = await instance.post<{ message: string }>(
    '/signup',
    joinInfo,
  );
  return response.data;
};
