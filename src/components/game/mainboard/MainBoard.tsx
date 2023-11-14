import React, { Dispatch, useState } from 'react';
import { Timer, Visibility } from '@mui/icons-material';
import { WordsType } from './InputWord';
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

type Props = WordsType & {
  rate: number;
  currentRate: number;
};

export default function MainBoard({
  words,
  start,
  setStart,
  rate,
  currentRate,
}: Props) {
  const [onAnswers, setOnAnswers] = useState(false);
  const [time, setTime] = useState(3);
  return (
    <MainWrapper>
      <NoticeBox>
        <Notice />
        {start ? (
          // <SearchBar setOnAnswers={setOnAnswers} words={words} />
          <TimerBox>
            <CountDown>{time}</CountDown>
          </TimerBox>
        ) : (
          // <Visibility
          //   sx={{
          //     fontSize: '50px',
          //     cursor: 'pointer',
          //     '&:hover': { scale: '1.03' },
          //   }}
          //   onClick={() => {
          //     setOnAnswers(!onAnswers);
          //   }}
          // />
          <Timer sx={{ fontSize: '50px' }} />
        )}
      </NoticeBox>
      <BoardFrame>
        {start ? (
          <Answers>{words[words.length - 1]}</Answers>
        ) : (
          <StartBtn setStart={setStart} />
        )}
      </BoardFrame>
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
    </MainWrapper>
  );
}
