import React, { Dispatch } from 'react';
import styled from 'styled-components';

const GameBtn = styled.button`
  width: 200px;
  height: 150px;
  font-size: 30px;
  font-weight: 600;
  color: #fff;
  background-color: #1d3557;
  border-radius: 20px;
  outline: none;
  border: none;
  &:hover {
    scale: 1.01;
  }
  animation: 1s ease all;
`;

interface Props {
  setStart: Dispatch<React.SetStateAction<boolean>>;
}

export default function StartBtn({ setStart }: Props) {
  function gameStart() {
    setStart(true);
  }
  return (
    <div>
      <GameBtn
        onClick={() => {
          gameStart();
        }}
      >
        Game Start!
      </GameBtn>
    </div>
  );
}
