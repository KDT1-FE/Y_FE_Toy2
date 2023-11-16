import axios from 'axios';

const search = async (word: string): Promise<boolean> => {
  try {
    const response = await axios.get(
      'https://openapi.naver.com/v1/search/encyc.json',
      {
        params: {
          query: word,
        },
        headers: {
          'X-Naver-Client-Id': `${process.env.REACT_APP_NAVER_API_KEY}`,
          'X-Naver-Client-Secret': `${process.env.REACT_APP_NAVER_SECRET}`,
        },
      },
    );

    const responseData = response.data.items;

    if (responseData && responseData.length === 0) {
      return false;
    }
    return true;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default search;
