import React, { useState } from 'react';
import styled from 'styled-components';
import Rating from './rating/Rating';
import MainBoard from './mainboard/MainBoard';
import InputWord from './mainboard/InputWord';

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
  const [start, setStart] = useState<boolean>(false);
  const [currentRate, setCurrentRate] = useState<number>(0);

  return (
    <Container>
      <ScreenWrapper>
        <Rating
          peoples={peoples}
          setPeoples={setPeoples}
          rate={rate}
          setRate={setRate}
        />
        <MainBoard
          setWords={setWords}
          words={words}
          start={start}
          setStart={setStart}
          rate={rate}
          currentRate={currentRate}
        />
      </ScreenWrapper>
      <InputWord
        words={words}
        setWords={setWords}
        rate={currentRate}
        setRate={setCurrentRate}
        start={start}
        setStart={setStart}
      />
    </Container>
  );
}
