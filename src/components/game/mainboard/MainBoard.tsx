import React from 'react';
import { Timer } from '@mui/icons-material';
import {
  Answers,
  BoardFrame,
  MainWrapper,
  MyRate,
  MyRateBox,
  NoticeBox,
  RateBox,
  ScoreName,
  TimerBox,
} from './boardStyle';
import Notice from './Notice';
import StartBtn from './timer/StartBtn';
import {
  CurrentRateType,
  RateType,
  StartType,
  TimeType,
  WordsType,
} from '../../../types/gameType';
import TimeGauge from './timer/TimeGauge';

type Props = WordsType &
  StartType &
  TimeType &
  CurrentRateType &
  Pick<RateType, 'rate'>;

export default function MainBoard({
  words,
  setWords,
  start,
  setStart,
  rate,
  currentRate,
  setCurrentRate,
  time,
  setTime,
}: Props) {
  return (
    <MainWrapper>
      <NoticeBox>
        <Notice />
        <RateBox>
          <MyRateBox>
            <ScoreName>Score</ScoreName>
            <MyRate>{currentRate}</MyRate>
          </MyRateBox>
          <MyRateBox>
            <ScoreName>High Score</ScoreName>
            <MyRate>{rate}</MyRate>
          </MyRateBox>
        </RateBox>
      </NoticeBox>
      <BoardFrame>
        {start ? (
          <Answers>{words[words.length - 1]}</Answers>
        ) : (
          <StartBtn
            setWords={setWords}
            setTime={setTime}
            setStart={setStart}
            setCurrentRate={setCurrentRate}
          />
        )}
      </BoardFrame>
      {start && (
        <TimerBox>
          <Timer sx={{ fontSize: '50px' }} />
          <TimeGauge time={time} />
        </TimerBox>
      )}
    </MainWrapper>
  );
}
