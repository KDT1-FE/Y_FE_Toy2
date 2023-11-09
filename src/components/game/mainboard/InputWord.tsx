import React, { Dispatch } from 'react';
import styled from 'styled-components';
import search from './searchWord';

type WordsType = {
  words: string[];
  setWords: Dispatch<React.SetStateAction<string[]>>;
};

const SubmitBtn = styled.button`
  width: 50px;
  height: 30px;
  border-radius: 5px;
  background-color: #1d3557;
  color: #fff;
`;

const GameInput = styled.input`
  width: 200px;
  height: 25px;
  border-radius: 5px;
`;

export default function InputWord({ words, setWords }: WordsType) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const inputElement = (e.target as HTMLFormElement).querySelector('input');
    const inputValue = inputElement?.value;
    if (inputValue) {
      if (words.length === 0) {
        setWords([...words, inputValue]);
        inputElement.value = '';
        return;
      }
      if (words[words.length - 1].charAt(words[words.length - 1].length - 1) === inputValue.charAt(0)) {
        setWords([...words, inputValue]);
        inputElement.value = '';
      } else {
        console.log('끝말이 이어지지 않습니다');
      }
    } else {
      console.log('단어를 입력해주세요');
    }
  };

  return (
    <div>
      <form
        onSubmit={async (e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          const inputValue = (e.target as HTMLFormElement).querySelector('input')?.value;
          if (inputValue) {
            const isRealWord = await search(inputValue);
            const isPossible = /^(?=(?:.*[a-z]){3,})(?!.*([a-z])\1{2,})[a-z]*$/.test(inputValue);
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
        <SubmitBtn type="submit">검사</SubmitBtn>
      </form>
    </div>
  );
}
