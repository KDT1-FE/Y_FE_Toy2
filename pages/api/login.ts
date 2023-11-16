import { NextApiRequest, NextApiResponse } from 'next';
import instance from '@/apis/axios';

interface LoginResponseValue {
  accessToken: string; // 사용자 접근 토큰
  refreshToken: string; // access token 발급용 토큰
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const loginData = req.body;
  const { data } = await instance.post<LoginResponseValue>('/login', loginData);

  const { accessToken, refreshToken } = data;

  res.setHeader('Set-Cookie', [
    `accessToken=${accessToken}; Path=/;`,
    `refreshToken=${refreshToken}; Path=/;`,
  ]);
  res.status(200).json(data);
};
