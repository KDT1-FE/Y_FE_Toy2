import { Link, useNavigate } from 'react-router-dom';
import styles from '@styles/pages/signin.module.scss';
import { login } from '@api/login';
import { useForm } from '@hooks/useForm';
import React, { useState } from 'react';
import { useAppDispatch } from '@/hooks/redux';
import { getUserId } from '@/store/userSlice';
import fastRequest from '@/api/fastRequest';
import { getUserInfo } from '@/store/getUserSlice';

const Signin = () => {
  const [id, onChangeId] = useForm();
  const [password, onChangePassword] = useForm();
  const [errors, setErrors] = useState('');

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const getSelfInfo = async (userId: string) => {
    try {
      const response = await fastRequest.searchUserInfo(
        userId,
        localStorage.getItem('access_token') as string,
      );

      return response;
    } catch (error) {
      console.error('error');
    }
  };

  const signin = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const result = await login(id, password);
    const { accessToken, refreshToken } = result;
    const user = await getSelfInfo(id);
    console.log(user);

    if (result.error) {
      setErrors(result.error);
    } else {
      localStorage.setItem('access_token', accessToken);
      localStorage.setItem('refresh_token', refreshToken);
      dispatch(getUserId(id));
      dispatch(getUserInfo(user));
      navigate('/lobby');
    }
  };
  return (
    <div className={styles.signin}>
      <div>
        <h1>Mafia</h1>
        {/* <img style={{width: 100, height: 100}} src="https://full-oil.pockethost.io/api/files/5who7j8fggfy5vg/eu5yc2nn8kv9d61/ghost01_3mNsoBR2XJ.svg" alt="" /> */}
      </div>
      <div className={styles.signin__container}>
        <form className={styles.signin__form} action="">
          <input
            placeholder="아이디를 입력해주세요."
            type="text"
            onChange={onChangeId}
            value={id}
          />
          <input
            placeholder="비밀번호를 입력해주세요."
            type="password"
            onChange={onChangePassword}
            value={password}
          />
          {errors && (
            <span className={styles.signin__form_error}>{errors}</span>
          )}

          <button
            className={styles.signin__btn}
            onClick={(event) => signin(event)}>
            로그인
          </button>
        </form>
      </div>
      <div className={styles.signup__link}>
        <Link to="/signup">회원가입</Link>
      </div>
    </div>
  );
};

export default Signin;
