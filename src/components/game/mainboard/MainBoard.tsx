import React from 'react';
import styled from 'styled-components';
import search from './searchWord';

const MainWrapper = styled.div`
  flex: 2;
`;
const SearchButton = styled.button`
  width: 150px;
  height: 100px;
  background-color: red;
`;

export default function MainBoard() {
  return (
    <MainWrapper>
      <SearchButton
        onClick={() => {
          search('second');
        }}
      >
        search
      </SearchButton>
    </MainWrapper>
  );
}
