import { Link, useNavigate } from 'react-router-dom';
import styles from '@styles/pages/signin.module.scss';
import { login } from '@api/login';
import { useForm } from '@hooks/useForm';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { getUserId } from '@/store/userSlice';

// 로그인 성공 시에 로그인 유저 id 를 전역 상태로 뿌려주기

const Signin = () => {
  const [id, onChangeId] = useForm();
  const [password, onChangePassword] = useForm();
  const [errors, setErrors] = useState('');

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const userId = useAppSelector((state) => state.userId);
  console.log(userId);

  const signin = async (event) => {
    event.preventDefault();

    const result = await login(id, password);

    if (result.error) {
      setErrors(result.error);
    } else {
      const { accessToken, refreshToken } = result;
      localStorage.setItem('access_token', accessToken);
      localStorage.setItem('refresh_token', refreshToken);

      dispatch(getUserId(id));
      navigate('/lobby');
    }
  };
  return (
    <div className={styles.signin}>
      <div>
        <h1>Mafia</h1>
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
