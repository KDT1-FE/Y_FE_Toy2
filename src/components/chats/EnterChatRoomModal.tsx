'use client';
import React from 'react';
import styled from 'styled-components';
import { EnterChatRoomModalProps } from './chatsStore';

const EnterChatRoomModal = ({ isOpen, onEnterClick, onCancleClick }: EnterChatRoomModalProps) => {
  return (
    <Wrapper style={{ display: isOpen ? 'block' : 'none' }}>
      <ModalContainer>
        <ModalMainText>
          <span>채팅방에 입장하시겠습니까?</span>
        </ModalMainText>
        <ModalBtnContainer>
          <EnterBtn onClick={onEnterClick}>입장하기</EnterBtn>
          <CancelBtn onClick={onCancleClick}>취소</CancelBtn>
        </ModalBtnContainer>
      </ModalContainer>
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

const ModalContainer = styled.div`
  position: absolute;
  width: 280px;
  height: 140px;
  top: 40%;
  left: 35%;
  border: none;
  border-radius: 0.6rem;
  background-color: ${({ theme }) => theme.color.mainGreen};
`;

const ModalMainText = styled.div`
  margin: 1rem 0 0;
  padding: 1.2rem;
  height: 60%;
  border-bottom: 1px solid #fff;
  span {
    font-weight: bold;
    font-size: 1.2rem;
    text-align: center;
    color: #fff;
    text-align: start;
  }
`;

const ModalBtnContainer = styled.div`
  display: flex;
  height: 40%;
  justify-content: center;
  border-radius: 0.6rem;
  overflow: hidden;
`;

const EnterBtn = styled.button`
  background-color: ${({ theme }) => theme.color.mainGreen};
  width: 50%;
  border: none;
  border-right: 1px solid #fff;
  font-style: normal;
  font-weight: bold;
  font-size: 1rem;
  text-align: center;
  color: #fff;
  cursor: pointer;
`;

const CancelBtn = styled(EnterBtn)`
  border: none;
`;
