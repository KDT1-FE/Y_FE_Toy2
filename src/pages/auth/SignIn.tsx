import axios from 'axios';
import { Box, Button, Container, TextField, Typography, Link as MuiLink } from '@mui/material';
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
    <Container sx={{ height: '100%' }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '80%',
        }}
      >
        <Box component="form" noValidate autoComplete="off" onSubmit={onSubmit}>
          <Typography variant="h4">로그인</Typography>
          <Typography color="text.secondary" variant="body1" sx={{ my: 3 }}>
            계정이 없으신가요? &nbsp;
            <MuiLink component={Link} to="/signup" underline="hover" variant="subtitle2">
              회원가입
            </MuiLink>
          </Typography>
          <TextField fullWidth label="아이디" value={uid} onChange={(e) => setUid(e.target.value)} margin="normal" />
          <TextField
            fullWidth
            type="password"
            label="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
          />
          <p>{errorMsg}</p>
          <Button fullWidth type="submit" size="large" variant="contained" sx={{ mt: 3 }}>
            로그인
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default SignIn;
