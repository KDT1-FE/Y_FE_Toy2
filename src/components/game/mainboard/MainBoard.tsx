import React, { useState } from 'react';
import { Visibility } from '@mui/icons-material';
import { WordsType } from './InputWord';
import {
  Answers,
  Board,
  BoardFrame,
  MainWrapper,
  NoticeBox,
} from './boardStyle';
import Notice from './Notice';
import SearchBar from './SearchBar';

export default function MainBoard({ words, setWords }: WordsType) {
  const [onAnswers, setOnAnswers] = useState(false);
  return (
    <MainWrapper>
      <NoticeBox>
        <Notice />
        {onAnswers ? (
          <SearchBar setOnAnswers={setOnAnswers} words={words} />
        ) : (
          <Visibility
            sx={{
              fontSize: '50px',
              cursor: 'pointer',
              '&:hover': { scale: '1.03' },
            }}
            onClick={() => {
              setOnAnswers(!onAnswers);
            }}
          />
        )}
      </NoticeBox>
      <BoardFrame>
        <Board>
          {words.length !== 0 ? (
            <Answers>{words[words.length - 1]}</Answers>
          ) : (
            <Answers>첫 단어를 입력해주세요!</Answers>
          )}
        </Board>
      </BoardFrame>
    </MainWrapper>
  );
}
