import React from 'react';
import { Timer } from '@mui/icons-material';
import {
  Answers,
  BoardFrame,
  CountDown,
  MainWrapper,
  MyRate,
  MyRateBox,
  NoticeBox,
  RateBox,
  TimerBox,
} from './boardStyle';
import Notice from './Notice';
import SearchBar from './SearchBar';
import StartBtn from './timer/StartBtn';
import { StartType, TimeType, WordsType } from '../gameType';

type Props = WordsType &
  StartType &
  TimeType & {
    rate: number;
    currentRate: number;
  };

export default function MainBoard({
  words,
  start,
  setStart,
  rate,
  currentRate,
  time,
  setTime,
}: Props) {
  return (
    <MainWrapper>
      <NoticeBox>
        <Notice />
        <RateBox>
          <MyRateBox>
            <MyRate>Score</MyRate>
            <MyRate>{currentRate}</MyRate>
          </MyRateBox>
          <MyRateBox>
            <MyRate>High Score</MyRate>
            <MyRate>{rate}</MyRate>
          </MyRateBox>
        </RateBox>
      </NoticeBox>
      <BoardFrame>
        {start ? (
          <Answers>{words[words.length - 1]}</Answers>
        ) : (
          <StartBtn
            time={time}
            setTime={setTime}
            start={start}
            setStart={setStart}
          />
        )}
      </BoardFrame>
      {start ? (
        <TimerBox>
          <CountDown>{time}</CountDown>
        </TimerBox>
      ) : (
        <Timer sx={{ fontSize: '50px' }} />
      )}
    </MainWrapper>
  );
}
