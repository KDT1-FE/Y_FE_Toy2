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

  return (
    <Container>
      <ScreenWrapper>
        <Rating />
        <MainBoard setWords={setWords} words={words} />
      </ScreenWrapper>
      <InputWord setWords={setWords} words={words} />
    </Container>
  );
}
