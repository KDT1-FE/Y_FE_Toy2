import React, { forwardRef, useImperativeHandle, Ref } from 'react';
import { styled } from 'styled-components';

interface ChattingModalProps {}

export interface ChattingModalRef {
  showModal: () => void;
}

const ChattingModal: React.ForwardRefRenderFunction<
  ChattingModalRef,
  ChattingModalProps
> = (_, ref: Ref<ChattingModalRef>) => {
  const showModal = () => {
    console.log('Modal is shown');
  };

  useImperativeHandle(ref, () => ({
    showModal,
  }));

  return <Container>chattingModal</Container>;
};

export default forwardRef(ChattingModal);

const Container = styled.div`
  width: 300px;
  height: 419px;
  border: 1px solid #e2e8f0;
  border-radius: 15px;
  position: absolute;
  right: 18.5rem;
  margin-top: 3rem;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
`;
