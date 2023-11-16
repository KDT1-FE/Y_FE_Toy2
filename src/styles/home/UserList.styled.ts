import styled from 'styled-components';

const List = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 80%;
  padding: 10px;

  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 10px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #1d3557;
    border-radius: 25px;
  }
`;

export default List;
