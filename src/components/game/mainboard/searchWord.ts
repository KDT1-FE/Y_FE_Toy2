import axios from 'axios';

const search = async (word: string) => {
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
        console.log(res);
      });
  } catch (error) {
    console.log(error);
  }
};

export default search;
