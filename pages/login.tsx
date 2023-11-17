import axios from 'axios';
import React, { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useSetRecoilState } from 'recoil';
import { GetServerSidePropsContext } from 'next';
import { setToken } from '@/utils/tokenManager';
import userTokenState from '@/recoil/atoms/userTokenState';
import { showNavigationState } from '@/recoil/atoms/showNavigationState';
import styles from '../../components/login.module.scss';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    serverId: process.env.NEXT_PUBLIC_API_KEY,
    withCredentials: true,
  },
});

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();

  const router = useRouter();
  const setUser = useSetRecoilState(userTokenState);

  const handleLoginClick: SubmitHandler<FieldValues> = async data => {
    const loginId = data.id.trim() as string;
    const password = data.password.trim() as string;
    if (loginId && password) {
      try {
        // await axios.post('/api/login', { id, password });
        const res = await instance.post('/login', {
          id: loginId,
          password,
        });
        const { accessToken, refreshToken } = res.data;

        setToken('ACCESS_TOKEN', accessToken);
        setToken('REFRESH_TOKEN', refreshToken);

        const userResponse = await axios.get(
          'https://fastcampus-chat.net/auth/me',
          {
            headers: {
              'Content-Type': 'application/json',
              serverId: 'cb7fb111e',
              Authorization: `Bearer ${accessToken}`,
            },
          },
        );

        const { id, name, picture } = userResponse.data.user;
        setUser({ id, name, picture, isLoggedIn: true });
        router.push('/');
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.response?.status === 400) {
            alert('잘못된 아이디 또는 비밀번호입니다.');
          }
        }
      }
    } else {
      alert('아이디 또는 비밀번호를 입력하세요.');
    }
  };
  const setShowNavigation = useSetRecoilState(showNavigationState);
  useEffect(() => {
    setShowNavigation(false);
    return () => {
      setShowNavigation(true);
    };
  }, []);

  return (
    <div className={styles.login_container}>
      <div className={styles.login_box}>
        <Image
          src="/images/Talkhaja.svg"
          alt="talkhaja_logo"
          width={250}
          height={80}
        />
        <h2>로그인</h2>
        <form
          className={styles.login_form_box}
          onSubmit={handleSubmit(handleLoginClick)}
        >
          <div className={styles.input_box}>
            <input type="text" placeholder="아이디" {...register('id')} />
            <input
              type="password"
              placeholder="비밀번호"
              {...register('password')}
            />
          </div>
          <div className={styles.button_box}>
            <button type="submit" disabled={isSubmitting}>
              로그인
            </button>
            <hr className={styles.horizontalLine} />
            <div className={styles.signUp_link}>
              <Link href="/signup" className={styles.link}>
                회원가입
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export const getServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const refreshToken = context.req.cookies.REFRESH_TOKEN;

  if (refreshToken) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
};
