import Image from 'next/image';
import Link from 'next/link';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import Auth from '@/apis/Auth';
import styles from './login.module.scss';

export default function Login() {
  const { login } = Auth();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();
  const handleLoginClick: SubmitHandler<FieldValues> = async data => {
    const id = data.loginId as string;
    const password = data.password as string;

    await login({ id, password });
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
