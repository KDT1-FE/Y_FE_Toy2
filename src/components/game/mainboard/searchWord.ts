import axios from 'axios';

// aws api gateway로 요청을 보내어 람다함수를 실행한 결과를 받아옵니다.
const search = async (word: string): Promise<boolean> => {
  try {
    const response = await axios.get(
      `https://immgvxh4o9.execute-api.ap-northeast-2.amazonaws.com/default/searchWord?query=${word}`,
    );
    if (response) {
      const data = JSON.parse(response.data.body);
      if (data.items.length > 0) {
        return true;
      }
    }
    return false;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default search;
