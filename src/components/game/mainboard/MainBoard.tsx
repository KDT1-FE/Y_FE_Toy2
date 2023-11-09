import React from 'react';
import { Visibility } from '@mui/icons-material';
import { WordsType } from './InputWord';
import { Answers, Board, BoardFrame, MainWrapper, NoticeBox } from './boardStyle';
import Notice from './Notice';

export default function MainBoard({ words, setWords }: WordsType) {
  return (
    <MainWrapper>
      <NoticeBox>
        <Notice />
        <Visibility sx={{ fontSize: '50px', cursor: 'pointer' }} />
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
