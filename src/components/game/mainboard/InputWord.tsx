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
import search from './searchWord';

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

  // 정답을 맞히면 남은 시간을 5초로 초기화 하고 제한시간이 종료될 시 현재 기록과 최고 기록이 같다면 현재 기록을 서버에 기록 후 랭킹리스트 재랜더링
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

  // 현재 기록이 최고 기록 보다 클 경우 최고 기록을 현재 기록으로 증가시킴
  useEffect(() => {
    if (currentRate > rate && start) {
      setRate(currentRate);
    }
  }, [currentRate]);

  // 프록시 서버의 수면상태를 해제하여 첫 번째 정답 딜레이 방지
  useEffect(() => {
    const fetchData = async () => {
      const ready = await search('start');
      console.log(ready);
    };

    fetchData();
  }, []);

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
