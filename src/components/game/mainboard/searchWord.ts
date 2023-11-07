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
        if (res.data.items.length > 0) {
          console.log(res.data.items[0].title);
        } else {
          console.log('해당 단어는 존재하지 않습니다!');
        }
      });
  } catch (error) {
    console.log(error);
  }
};

export default search;
