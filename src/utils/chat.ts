import { maxNumberToShow } from '../constants/chats';

export const getJoinerMessage = (joiners: string[]) => {
  if (joiners.length > maxNumberToShow) {
    return `${(joiners[1], joiners[2], joiners[3])}님외 ${
      joiners.length - 3
    }명이 참가했습니다`;
  }
  return `${joiners.join(',')}님이 참가했습니다`;
};

export const getLeaverMessage = (leaver: string) => {
  return `${leaver}님이 나갔습니다`;
};
