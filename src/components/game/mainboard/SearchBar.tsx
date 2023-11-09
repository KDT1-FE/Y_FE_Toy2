import React, { Dispatch } from 'react';
import { Clear } from '@mui/icons-material';
import styled from 'styled-components';
import { SearchModal } from './boardStyle';

type SetOnAnswers = {
  words: string[];
  setOnAnswers: Dispatch<React.SetStateAction<boolean>>;
};

const SearchInput = styled.input`
  width: 80%;
`;
const WordsBox = styled.div`
  width: 80%;
`;
const Words = styled.span`
  font-size: 25px;
  font-weight: 700;
`;

export default function SearchBar({ setOnAnswers, words }: SetOnAnswers) {
  return (
    <SearchModal>
      <Clear
        sx={{ top: 0, right: 0, position: 'absolute', cursor: 'pointer', fontSize: '40px' }}
        onClick={() => setOnAnswers(false)}
      />
      <SearchInput type="text" />
      <WordsBox>
        {words.length !== 0 ? words.map((e) => <Words>{e}, </Words>) : <h2>끝말잇기를 시작해주세요</h2>}
      </WordsBox>
    </SearchModal>
  );
}
