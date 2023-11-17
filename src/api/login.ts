import { LoginForm } from '../@types/login';
import instance from './axios';

interface RequestBody {
  id: string;
  password: string;
}

interface ResponseValue {
  accessToken: string;
  refreshToken: string;
}

export const login = async (LoginForm: LoginForm) => {
  const { id, password } = LoginForm;

  const requestBody: RequestBody = {
    id,
    password,
  };

  try {
    const response = await instance.post<ResponseValue>('/login', requestBody);

    return response.data;
  } catch (error) {
    console.error('Error during login:', error);
    throw error;
  }
};
