import axios from 'axios';

const search = async (word: string): Promise<boolean> => {
  const id = '5QAJk_1jsPDcB6gwYULW';
  const secret = 'lHciGgxJik';
  try {
    const response = await axios.get('/v1/search/encyc.json', {
      params: {
        query: word,
      },
      headers: {
        'X-Naver-Client-Id': id,
        'X-Naver-Client-Secret': secret,
      },
    });

    const responseData = response.data.items;
    if (responseData.length === 0) {
      return false;
    }

    return true;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default search;
