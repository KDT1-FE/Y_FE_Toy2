import { useContext } from "react";
import { AuthContext } from "./useAuth";
import axios from "axios";
import { apiHeader } from "../utils/apiHeader";

function useApi() {
  const { accessToken } = useContext(AuthContext);

  const headers = {
    ...(apiHeader as Record<string, string>),
    Authorization: `Bearer ${accessToken}`
  };

  const getData = async (url: string) => {
    try {
      const response = await axios.get(url, { headers });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const postData = async (url: string, requestBody: {}) => {
    try {
      const response = await axios.post(url, requestBody, { headers });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const patchData = async (url: string, requestBody: {}) => {
    try {
      const response = await axios.patch(url, requestBody, { headers });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  return { getData, postData, patchData };
}

export default useApi;

/* 사용법
  1) 사용하고자 하는 컴포넌트에서 useApi 커스텀 훅을 import 합니다.
  2) 사용하고자 하는 함수를 구조 분해 할당형식으로 변수로 저장합니다 ex) const { getData } = useApi();
  3) 변수를 지정하고 async, await 처리를 해줍니다.
  4) 예시 코드

  useEffect(() => {
    const 함수명 = async () => {
      try {
        const res = await getData("https://fastcampus-chat.net/users");
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    };
    함수명();
  }, []);

*/
