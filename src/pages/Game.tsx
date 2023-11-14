import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import Rating from '../components/game/rating/Rating';
import MainBoard from '../components/game/mainboard/MainBoard';
import InputWord from '../components/game/mainboard/InputWord';
import { userState } from '../atoms';
import { getRate } from '../utils/utils';

const ScreenWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: space-between;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

export default function Game() {
  const [words, setWords] = useState<string[] | []>([]);
  const [peoples, setPeoples] = useState<{ name: string; correct: number }[]>(
    [],
  );
  const [rate, setRate] = useState<number>(0);
  const [currentRate, setCurrentRate] = useState<number>(0);
  const [start, setStart] = useState<boolean>(false);
  const [time, setTime] = useState<number>(1);
  const user = useRecoilValue(userState);

  useEffect(() => {
    if (user) {
      const data = JSON.parse(user);
      if (data) {
        getRate(setPeoples, data.id, setRate);
      }
    }
  }, []);

  return (
    <Container>
      <ScreenWrapper>
        <Rating peoples={peoples} />
        <MainBoard
          words={words}
          setWords={setWords}
          start={start}
          setStart={setStart}
          rate={rate}
          currentRate={currentRate}
          setCurrentRate={setCurrentRate}
          time={time}
          setTime={setTime}
        />
      </ScreenWrapper>
      <InputWord
        words={words}
        setWords={setWords}
        currentRate={currentRate}
        setCurrentRate={setCurrentRate}
        rate={rate}
        setRate={setRate}
        setPeoples={setPeoples}
        start={start}
        setStart={setStart}
        time={time}
        setTime={setTime}
      />
    </Container>
  );
}
