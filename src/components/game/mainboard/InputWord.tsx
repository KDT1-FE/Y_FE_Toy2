import React, { Dispatch } from 'react';
import search from './searchWord';

type WordsType = {
  words: string[];
  setWords: Dispatch<React.SetStateAction<string[]>>;
};

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
            if (isRealWord) {
              handleSubmit(e);
            }
          }
        }}
      >
        <input type="text" />
        <button type="submit">검사</button>
      </form>
    </div>
  );
}
