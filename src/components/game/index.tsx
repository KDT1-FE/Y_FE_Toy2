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

  return (
    <Container>
      <ScreenWrapper>
        <Rating
          peoples={peoples}
          setPeoples={setPeoples}
          rate={rate}
          setRate={setRate}
        />
        <MainBoard setWords={setWords} words={words} />
      </ScreenWrapper>
      <InputWord
        words={words}
        setWords={setWords}
        peoples={peoples}
        setPeoples={setPeoples}
        rate={rate}
        setRate={setRate}
      />
    </Container>
  );
}
