import React from 'react';
import styled from 'styled-components';
import Rating from './rating/Rating';
import MainBoard from './mainboard/MainBoard';

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: space-between;
`;

export default function Game() {
  return (
    <Wrapper>
      <Rating />
      <MainBoard />
    </Wrapper>
  );
}
