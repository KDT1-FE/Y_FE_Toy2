import React, { Dispatch } from 'react';
import toast from 'react-hot-toast';
import timeLimit from './timer/timeLimit';
import search from './searchWord';
import soundPlay from '../sound/soundPlay';

const handleSubmit = (
  e: React.FormEvent<HTMLFormElement>,
  words: string[],
  setWords: Dispatch<React.SetStateAction<string[]>>,
  setCurrentRate: Dispatch<React.SetStateAction<number>>,
  start: boolean,
  setTime: Dispatch<React.SetStateAction<number>>,
) => {
  const inputElement = (e.target as HTMLFormElement).querySelector('input');
  const inputValue = inputElement?.value;
  const existCheck = words?.find((e) => e === inputValue);
  if (inputValue) {
    if (
      words[words.length - 1].charAt(words[words.length - 1].length - 1) ===
      inputValue.charAt(0)
    ) {
      if (existCheck) {
        soundPlay('error');
        toast.error('이미 사용된 단어입니다');
        return false;
      }
      setWords([...words, inputValue]);
      setCurrentRate((prev) => prev + 1);
      inputElement.value = '';
      soundPlay('success');
      timeLimit(start, setTime);
    } else {
      soundPlay('error');
      toast.error('끝말이 이어지지 않습니다');
    }
  }
  return true;
};

const checkWord = async (
  e: React.FormEvent<HTMLFormElement>,
  start: boolean,
  words: string[],
  setWords: Dispatch<React.SetStateAction<string[]>>,
  setCurrentRate: Dispatch<React.SetStateAction<number>>,
  setTime: Dispatch<React.SetStateAction<number>>,
) => {
  const inputValue = (e.target as HTMLFormElement).querySelector('input')
    ?.value;
  if (start) {
    if (inputValue) {
      const isPossible =
        /^(?=(?:.*[a-z]){3,})(?!.*([a-z])\1{2,})[a-z]{3,10}$/.test(inputValue);
      if (isPossible) {
        const isRealWord = await search(inputValue);
        if (isRealWord) {
          handleSubmit(e, words, setWords, setCurrentRate, start, setTime);
        } else {
          soundPlay('error');
          toast.error('존재하지 않는 단어입니다!');
        }
      } else {
        soundPlay('error');
        toast.error('형식에 맞지 않는 입력입니다!');
      }
    } else {
      soundPlay('error');
      toast.error('단어를 입력해주세요');
    }
  } else {
    soundPlay('error');
    toast.error('시작 버튼을 눌러주세요!');
  }
};

export default checkWord;
