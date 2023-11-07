import axios from 'axios';
import React, { Dispatch } from 'react';

const search = async (word: string, setExist: Dispatch<React.SetStateAction<number>>) => {
  const id = '5QAJk_1jsPDcB6gwYULW';
  const secret = 'lHciGgxJik';
  try {
    await axios
      .get('/v1/search/encyc.json', {
        params: {
          query: word,
        },
        headers: {
          'X-Naver-Client-Id': id,
          'X-Naver-Client-Secret': secret,
        },
      })
      .then((res) => {
        const exist = res.data.items;
        if (exist.length === 0) {
          console.log('해당 단어는 존재하지 않습니다!');
          setExist(0);
        } else {
          setExist(1);
          if (exist[0].title.charAt(0) === '<') {
            console.log(exist[1].title);
          } else {
            console.log(exist[0].title);
          }
        }
      });
  } catch (error) {
    console.log(error);
  }
};

export default search;
