import React, { useState } from 'react';
import styled from 'styled-components';
import InputWord from './InputWord';

const MainWrapper = styled.div`
  flex: 2;
`;

export default function MainBoard() {
  const [words, setWords] = useState<string[] | []>([]);
  return (
    <MainWrapper>
      {words.length !== 0 ? words.map((e) => <h2>{e}</h2>) : <h2>없음</h2>}
      <InputWord setWords={setWords} words={words} />
    </MainWrapper>
  );
}
