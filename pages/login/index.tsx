import { accessTokenSelector } from '@/recoil/atoms/tokenState';
import axios from 'axios';
import { cookies } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useRecoilState } from 'recoil';
import { login, refresh } from '@/apis/Auth';
import styles from './login.module.scss';

interface LoginRequestBody {
  id: string; // 사용자 아이디 (필수!)
  password: string; // 사용자 비밀번호 (필수!)
  accessToken: string | null;
}

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<LoginRequestBody>();
  const [accessTokenAtom, setAccessTokenAtom] =
    useRecoilState(accessTokenSelector);

  const handleLoginClick: SubmitHandler<LoginRequestBody> = async ({
    id,
    password,
  }) => {
    try {
      const { accessToken, refreshToken } = await login({
        id,
        password,
      });
      setAccessTokenAtom(accessToken);
      cookies().set('refreshToken', refreshToken);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.status === 401) {
          throw Error(error.message);
        }

        if (accessTokenAtom) {
          const accessToken = await refresh();
          setAccessTokenAtom(accessToken);
        }
      }
    }
  };

  return (
    <div className={styles.login_container}>
      <div className={styles.login_box}>
        <Image
          src="/images/logo.png"
          alt="talkhaja_logo"
          width={200}
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
