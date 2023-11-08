import axios from 'axios';
import { Box, Button, Container, TextField } from '@mui/material';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { publicApi } from '../../libs/axios';

interface ResponseValue {
  accessToken: string; // 사용자 접근 토큰
  refreshToken: string; // access token 발급용 토큰
}

function SignIn() {
  const [uid, setUid] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await publicApi.post<ResponseValue>('login', {
        id: uid,
        password,
      });

      localStorage.setItem('accessToken', res.data.accessToken);
      localStorage.setItem('refreshToken', res.data.refreshToken);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // axios에서 발생한 error
        if (error.code === 'ERR_BAD_REQUEST') {
          setErrorMsg('아이디 혹은 비밀번호를 잘못 입력하셨습니다.');
        }
      }
    }
  };

  return (
    <Container>
      <Box component="form" noValidate autoComplete="off" onSubmit={onSubmit}>
        <TextField
          fullWidth
          variant="outlined"
          label="아이디"
          value={uid}
          onChange={(e) => setUid(e.target.value)}
          margin="normal"
        />
        <TextField
          fullWidth
          type="password"
          variant="outlined"
          label="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          margin="normal"
        />
        <p>{errorMsg}</p>
        <Button variant="contained" type="submit">
          로그인
        </Button>
      </Box>
      <p>
        <Link to="/signup">회원가입</Link>
      </p>
    </Container>
  );
}

export default SignIn;
