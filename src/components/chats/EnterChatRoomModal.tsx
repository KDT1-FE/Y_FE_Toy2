'use client';
import React from 'react';
import styled from 'styled-components';

const EnterChatRoomModal = () => {
  return (
    <Wrapper>
      <ModalContainer>채팅방에 입장하시겠습니까?</ModalContainer>
    </Wrapper>
  );
};

export default EnterChatRoomModal;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  z-index: 999;
`;

/* Rectangle 24 */
const ModalContainer = styled.div`
  position: absolute;
  width: 250px;
  height: 130px;
  top: 50%;
  left: 50%;
  border: 1px solid black;
  border-radius: 0.6rem;
  background-color: ${({ theme }) => theme.color.mainGreen};
`;

const ModalMainText = styled.p`
  font-style: normal;
  font-weight: bold;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
`;
