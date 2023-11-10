import React, { Dispatch, useEffect, useState } from 'react';
import { Clear } from '@mui/icons-material';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { SearchModal } from './boardStyle';

type SetOnAnswers = {
  words: string[];
  setOnAnswers: Dispatch<React.SetStateAction<boolean>>;
};

const SearchInput = styled(motion.input)`
  width: 300px;
  border-radius: 10px;
  height: 40px;
  font-weight: 600;
  font-size: 30px;
  border: 3px solid #1d3557;
  box-sizing: border-box;
`;
const WordsBox = styled.div<{ props: boolean }>`
  width: 288px;
  max-height: 360px;
  display: ${(props) => (props.props ? 'flex' : 'none')};
  flex-direction: column;
  align-items: center;
  overflow: scroll;
  background-color: #fff;
  border: 1px solid #dadada;
  color: #1d3557;
  position: absolute;
  top: 40px;
  left: 4px;
  border-radius: 0 0 10px 10px;
  &::-webkit-scrollbar {
    display: none;
  }
`;
const Words = styled.p`
  width: 100%;
  height: 60px;
  font-size: 25px;
  padding: 13px 0;
  margin: 0 auto;
  font-weight: 700;
  text-align: center;
  border-bottom: 1px solid #dadada;
  box-sizing: border-box;
`;

export default function SearchBar({ setOnAnswers, words }: SetOnAnswers) {
  const [question, setQuestion] = useState<string | undefined>('');
  const [focus, setFocus] = useState(false);

  function handleFocus() {
    setFocus(!focus);
  }
  return (
    <SearchModal>
      <Clear
        sx={{
          top: 0,
          right: 0,
          position: 'absolute',
          cursor: 'pointer',
          fontSize: '40px',
        }}
        onClick={() => setOnAnswers(false)}
      />
      <SearchInput
        type="text"
        onFocus={() => {
          handleFocus();
        }}
        onBlur={() => {
          handleFocus();
        }}
        onChange={(e) => {
          setQuestion(e.target.value);
        }}
      />
      <WordsBox props={focus}>
        {words.length !== 0 && question !== undefined ? (
          words
            .filter((e) => e.startsWith(question))
            .reverse()
            .map((e) => <Words>{e}</Words>)
        ) : (
          <Words>정답이 없습니다.</Words>
        )}
      </WordsBox>
    </SearchModal>
  );
}
