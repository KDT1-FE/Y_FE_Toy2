import React, { Dispatch, useState } from 'react';
import styled from 'styled-components';
import { Send } from '@mui/icons-material';
import search from './searchWord';

export type WordsType = {
  words: string[];
  setWords: Dispatch<React.SetStateAction<string[]>>;
};

const InputBox = styled.form`
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: center;
  padding: 20px 50px;
  gap: 10px;
  background-color: #1d3557;
  box-sizing: border-box;
`;

const SubmitBtn = styled.button`
  width: 80px;
  height: 44px;
  border-radius: 5px;
  background-color: #26446d;
  border: none;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  font-size: 12px;
  &:hover {
    background-color: #2e4c77;
  }
`;

const GameInput = styled.input`
  flex: 1;
  height: 40px;
  font-size: 25px;
  font-weight: 600;
  border-radius: 5px;
  outline: none;
  &:focus {
    outline: 1px solid #a8dadc;
  }
`;

export default function InputWord({ words, setWords }: WordsType) {
  const [existWord, setExistWord] = useState<string[]>();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const inputElement = (e.target as HTMLFormElement).querySelector('input');
    const inputValue = inputElement?.value;
    const existCheck = existWord?.find((e) => e === inputValue);
    if (inputValue) {
      if (words.length === 0) {
        setWords([...words, inputValue]);
        setExistWord([inputValue]);
        inputElement.value = '';
        return;
      }
      if (
        words[words.length - 1].charAt(words[words.length - 1].length - 1) ===
        inputValue.charAt(0)
      ) {
        if (existCheck) {
          alert('이미 사용된 단어입니다');
          return;
        }
        setWords([...words, inputValue]);
        if (existWord) {
          setExistWord([...existWord, inputValue]);
        }
        inputElement.value = '';
      } else {
        alert('끝말이 이어지지 않습니다');
      }
    } else {
      alert('단어를 입력해주세요');
    }
  };

  return (
    <InputBox
      onSubmit={async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const inputValue = (e.target as HTMLFormElement).querySelector('input')
          ?.value;
        if (inputValue) {
          const isRealWord = await search(inputValue);
          const isPossible =
            /^(?=(?:.*[a-z]){3,})(?!.*([a-z])\1{2,})[a-z]{3,10}$/.test(
              inputValue,
            );
          console.log(isPossible);

          if (isPossible) {
            if (isRealWord) {
              handleSubmit(e);
            } else {
              alert('존재하지 않는 단어입니다!');
            }
          } else {
            alert('형식에 맞지 않는 입력입니다!');
          }
        }
      }}
    >
      <GameInput type="text" />
      <SubmitBtn type="submit">
        SEND
        <Send />
      </SubmitBtn>
    </InputBox>
  );
}
