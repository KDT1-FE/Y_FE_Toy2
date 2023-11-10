import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Link as MuiLink,
} from '@mui/material';
import { useFormik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { publicApi } from '../../libs/axios';
import { accessTokenState } from '../../atoms';

interface ResponseValue {
  accessToken: string; // 사용자 접근 토큰
  refreshToken: string; // access token 발급용 토큰
}

function SignIn() {
  const navigate = useNavigate();
  const [accessToken, setAccessTokenState] = useRecoilState(accessTokenState);
  const formik = useFormik({
    initialValues: {
      id: '',
      password: '',
    },
    onSubmit: async (values) => {
      try {
        const { id, password } = values;
        const res = await publicApi.post<ResponseValue>('login', {
          id,
          password,
        });

        // eslint-disable-next-line @typescript-eslint/dot-notation
        // privateApi.defaults.headers.common['Authorization'] =
        //   res.data.accessToken;
        // const res2 = await privateApi.get('auth/me');
        // const { user } = res2.data;

        localStorage.setItem('accessToken', res.data.accessToken);
        localStorage.setItem('refreshToken', res.data.refreshToken);
        // localStorage.setItem('user', JSON.stringify(user));
        setAccessTokenState(res.data.accessToken);
        // setUserData(JSON.stringify(user));
      } catch (error) {
        if (axios.isAxiosError(error)) {
          // axios에서 발생한 error
          if (error.code === 'ERR_BAD_REQUEST') {
            // setErrorMsg('아이디 혹은 비밀번호를 잘못 입력하셨습니다.');
          }
        }
      }
    },
  });

  useEffect(() => {
    if (accessToken) {
      // 유저 정보와 액세스 토큰이 있을때
      navigate('/home');
    }
  }, [accessToken, navigate]);

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
        <Box
          component="form"
          noValidate
          autoComplete="off"
          onSubmit={formik.handleSubmit}
        >
          <Typography variant="h4">로그인</Typography>
          <Typography color="text.secondary" variant="body1" sx={{ my: 3 }}>
            계정이 없으신가요? &nbsp;
            <MuiLink
              component={Link}
              to="/signup"
              underline="hover"
              variant="subtitle2"
            >
              회원가입
            </MuiLink>
          </Typography>
          <TextField
            fullWidth
            label="아이디"
            id="id"
            name="id"
            value={formik.values.id}
            onChange={formik.handleChange}
            margin="normal"
          />
          <TextField
            fullWidth
            type="password"
            label="비밀번호"
            id="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            margin="normal"
          />
          <Button
            fullWidth
            type="submit"
            size="large"
            variant="contained"
            sx={{ mt: 3 }}
          >
            로그인
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default SignIn;
