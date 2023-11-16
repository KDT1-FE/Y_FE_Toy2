import React, { Dispatch } from 'react';
import toast from 'react-hot-toast';
import timeLimit from './timer/timeLimit';
import search from './searchWord';
import soundPlay from '../sound/soundPlay';

const checkWord = async (
  e: React.FormEvent<HTMLFormElement>,
  start: boolean,
  words: string[],
  setWords: Dispatch<React.SetStateAction<string[]>>,
  setCurrentRate: Dispatch<React.SetStateAction<number>>,
  setTime: Dispatch<React.SetStateAction<number>>,
) => {
  const inputElement = (e.target as HTMLFormElement).querySelector('input');
  const inputValue = inputElement?.value;
  const existCheck = words?.find((e) => e === inputValue);
  // 시작 버튼을 눌렀는지
  if (start) {
    // 단어를 입력하였는지
    if (inputValue) {
      // 이미 입력한 단어인지
      if (existCheck) {
        soundPlay('error');
        toast.error('이미 사용된 단어입니다');
        return false;
      }
      // 끝말이 이어지는지
      if (
        words[words.length - 1].charAt(words[words.length - 1].length - 1) ===
        inputValue.charAt(0)
      ) {
        // 형식에 맞게 입력하였는지
        const isPossible =
          /^(?=(?:.*[a-z]){3,})(?!.*([a-z])\1{2,})[a-z]{3,10}$/.test(
            inputValue,
          );
        if (isPossible) {
          const isRealWord = await search(inputValue);
          // 네이버 사전에 검색 가능한 단어인지
          if (isRealWord) {
            setWords([...words, inputValue]);
            setCurrentRate((prev) => prev + 1);
            inputElement.value = '';
            soundPlay('success');
            timeLimit(start, setTime);
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
        toast.error('끝말이 이어지지 않습니다');
      }
    } else {
      soundPlay('error');
      toast.error('단어를 입력해주세요');
    }
  } else {
    soundPlay('error');
    toast.error('시작 버튼을 눌러주세요!');
  }
  return false;
};

export default checkWord;
