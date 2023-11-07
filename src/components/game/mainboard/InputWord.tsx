import React, { Dispatch, useState } from 'react';
import search from './searchWord';

type WordsType = {
  words: string[];
  setWords: Dispatch<React.SetStateAction<string[]>>;
};

export default function InputWord({ words, setWords }: WordsType) {
  const [exist, setExist] = useState(0);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const inputValue = (e.target as HTMLFormElement).querySelector('input')?.value;
    if (inputValue) {
      if (words.length === 0) {
        setWords([...words, inputValue]);
        console.log(words);
      }
      if (words[words.length - 1].charAt(words[words.length - 1].length - 1) === inputValue.charAt(0)) {
        setWords([...words, inputValue]);
        console.log(words);
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
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          const inputValue = (e.target as HTMLFormElement).querySelector('input')?.value;
          if (inputValue) {
            search(inputValue, setExist);
            if (exist) {
              handleSubmit(e);
            }
          }
          setExist(0);
        }}
      >
        <input type="text" />
        <button type="submit">검사</button>
      </form>
    </div>
  );
}
