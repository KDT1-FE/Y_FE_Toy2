import styled, { keyframes } from 'styled-components';

export const MainWrapper = styled.div`
  position: relative;
  flex: 2;
  height: calc(100vh - 80px);
  display: flex;
  padding: 50px;
  border-left: 1px solid #dadada;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
`;

export const SearchModal = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  box-sizing: border-box;
`;

export const NoticeBox = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
`;

export const Answers = styled.span`
  font-size: 50px;
  font-weight: 700;
  color: #1d3557;
`;

export const BoardFrame = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  border-radius: 20px;
  padding: 100px;
  box-sizing: border-box;
`;

export const Board = styled.div`
  width: 100%;
  height: 500px;
  background-color: #fff;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 50px;
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;
