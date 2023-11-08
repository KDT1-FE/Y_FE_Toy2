import React, { useState } from 'react';
import styled from 'styled-components';
import InputWord from './InputWord';

const MainWrapper = styled.div`
  flex: 2;
  display: flex;
  border-left: 1px solid #dadada;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const BoardFrame = styled.div`
  width: 600px;
  height: 800px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  background-color: #a8dadc;
  border-radius: 20px;
  padding: 100px;
  box-sizing: border-box;
`;

const Board = styled.div`
  width: 100%;
  height: 500px;
  background-color: #fff;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export default function MainBoard() {
  const [words, setWords] = useState<string[] | []>([]);
  return (
    <MainWrapper>
      <BoardFrame>
        <Board>{words.length !== 0 ? words.map((e) => <h2>{e}</h2>) : <h2>없음</h2>}</Board>
        <InputWord setWords={setWords} words={words} />
      </BoardFrame>
    </MainWrapper>
  );
}
