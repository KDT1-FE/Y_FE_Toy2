import React from 'react';
import styled from 'styled-components';
import { StartType, TimeType } from '../../gameType';

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

type Props = StartType & TimeType;
export default function StartBtn({ setTime, setStart }: Props) {
  function gameStart() {
    setStart(true);
  }
  return (
    <div>
      <GameBtn
        onClick={() => {
          gameStart();
          setTime(5);
        }}
      >
        Game Start!
      </GameBtn>
    </div>
  );
}
