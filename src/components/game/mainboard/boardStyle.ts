import styled from 'styled-components';

export const MainWrapper = styled.div`
  position: relative;
  flex: 2;
  min-width: 1140px;
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
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const TimerBox = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 80px;
  background-color: #e63946;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const CountDown = styled.span`
  font-size: 30px;
  color: #fefefe;
`;

export const RateBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

export const MyRateBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;
export const MyRate = styled.span`
  font-size: 25px;
`;
