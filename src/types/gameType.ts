import { Dispatch } from 'react';

export type WordsType = {
  words: string[];
  setWords: Dispatch<React.SetStateAction<string[]>>;
};
export type PeoplesType = {
  peoples: { name: string; correct: number }[];
  setPeoples: Dispatch<
    React.SetStateAction<{ name: string; correct: number }[]>
  >;
};
export type RateType = {
  rate: number;
  setRate: Dispatch<React.SetStateAction<number>>;
};
export type CurrentRateType = {
  currentRate: number;
  setCurrentRate: Dispatch<React.SetStateAction<number>>;
};
export type StartType = {
  start: boolean;
  setStart: Dispatch<React.SetStateAction<boolean>>;
};
export type TimeType = {
  time: number;
  setTime: Dispatch<React.SetStateAction<number>>;
};
export type UserIdType = {
  userId: string;
};
