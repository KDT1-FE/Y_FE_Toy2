import axios from 'axios';
import { SERVER_URL, CONTENT_TYPE, SERVER_ID } from '../constant';

export const signup = async (
  id: string,
  password: string,
  name: string,
  picture?: string,
) => {
  const authData = {
    id,
    password,
    name,
    picture,
  };
  console.log(authData);

  try {
    return await axios.post(`${SERVER_URL}/signup`, authData, {
      headers: {
        'content-type': CONTENT_TYPE,
        serverId: SERVER_ID,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
