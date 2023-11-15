import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Send } from '@mui/icons-material';
import { useRecoilValue } from 'recoil';
import {
  CurrentRateType,
  PeoplesType,
  RateType,
  StartType,
  TimeType,
  WordsType,
} from '../../../types/gameType';
import { userState } from '../../../atoms';
import { updateRate } from '../../../utils/utils';
import checkWord from './checkWord';
import soundPlay from '../sound/soundPlay';

type Props = WordsType &
  CurrentRateType &
  Pick<PeoplesType, 'setPeoples'> &
  RateType &
  StartType &
  TimeType;

const InputBox = styled.form`
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: center;
  padding: 20px 50px;
  gap: 10px;
  background-color: #1d3557;
  box-sizing: border-box;
`;

const SubmitBtn = styled.button`
  width: 80px;
  height: 44px;
  border-radius: 5px;
  background-color: #26446d;
  border: none;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  font-size: 12px;
  &:hover {
    background-color: #2e4c77;
  }
`;

const GameInput = styled.input`
  flex: 1;
  height: 40px;
  font-size: 25px;
  font-weight: 600;
  border-radius: 5px;
  outline: none;
  &:focus {
    outline: 1px solid #a8dadc;
  }
`;

export default function InputWord({
  words,
  setWords,
  currentRate,
  setCurrentRate,
  rate,
  setRate,
  setPeoples,
  start,
  setStart,
  time,
  setTime,
}: Props) {
  const user = useRecoilValue(userState);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prev) => prev - 1);
    }, 1000);
    if (time === 0 && start) {
      clearInterval(interval);
      setWords([]);
      soundPlay('end');
      if (user) {
        const data = JSON.parse(user);
        if (data) {
          if (currentRate === rate) {
            updateRate(setPeoples, data.id, setRate, { correct: currentRate });
          }
        }
      }
      setStart(false);
      setCurrentRate(0);
    }
    if (currentRate > 0 && !start) {
      setCurrentRate(0);
    }
    return () => {
      clearInterval(interval);
    };
  }, [time]);

  useEffect(() => {
    if (currentRate > rate && start) {
      setRate(currentRate);
    }
  }, [currentRate]);

  return (
    <InputBox
      onSubmit={async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        checkWord(e, start, words, setWords, setCurrentRate, setTime);
      }}
    >
      <GameInput type="text" />
      <SubmitBtn type="submit">
        SEND
        <Send />
      </SubmitBtn>
    </InputBox>
  );
}
