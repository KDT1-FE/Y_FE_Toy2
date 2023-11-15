import { KOREAN_TIME_OFFSET } from '../constants/time';

export const formatTimeToKST = (date: Date) => {
  const newDate = new Date(date);

  const kst = new Date(newDate.getTime() + KOREAN_TIME_OFFSET);
  const year = kst.getFullYear();
  const month = String(kst.getMonth() + 1).padStart(2, '0');
  const day = String(kst.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};
