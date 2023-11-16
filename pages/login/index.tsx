import Image from 'next/image';
import Link from 'next/link';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/router';
import { getCookie } from 'cookies-next';
import { GetServerSideProps } from 'next';
import { useEffect } from 'react';
import styles from './login.module.scss';

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();
  const router = useRouter();
  const handleLoginClick: SubmitHandler<FieldValues> = async data => {
    const id = data.loginId as string;
    const password = data.password as string;
    await axios.post('/api/login', { id, password });
    router.push('/');
  };

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
            <input type="text" placeholder="아이디" {...register('loginId')} />
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

export const getServerSideProps: GetServerSideProps = async context => {
  const cookies = context.req.headers.cookie || ''; // 쿠키 문자열을 가져옴
  const accessTokenCookie = cookies
    .split(';')
    .find(cookie => cookie.trim().startsWith('accessToken='));

  if (accessTokenCookie) {
    // accessToken이 없으면 로그인 페이지로 리다이렉트
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  // accessToken이 있다면 홈 페이지로 이동
  return {
    props: {},
  };
};
