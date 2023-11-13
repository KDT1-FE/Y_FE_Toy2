import { Link, useNavigate } from 'react-router-dom';
import styles from '@styles/pages/signin.module.scss';
import { login } from '@api/login';
import { useForm } from '@hooks/useForm';
import { useState } from 'react';

const Signin = () => {
  const [id, onChangeId] = useForm();
  const [password, onChangePassword] = useForm();
  const [errors, setErrors] = useState('');

  // const navigate = useNavigate();
  console.log('hello');

  const signin = async (event) => {
    event.preventDefault();

    const result = await login(id, password);
    console.log(result);

    if (result.error) {
      setErrors(result.error);
    } else {
      const { accessToken, refreshToken } = result;
      localStorage.setItem('access_token', accessToken);
      localStorage.setItem('refresh_token', refreshToken);
      // navigate("/Loby");
    }
  };
  return (
    <div>
      <div>
        <div className={styles.main__background}>
          <div>
            <h1>Mafia</h1>
          </div>
          <div className={styles.signin_container}>
            <form className={styles.signin_form} action="">
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
              {errors && <span className={styles.form_error}>{errors}</span>}

              {/* 로그인 api */}
              <button
                className={styles.signin_btn}
                onClick={(event) => signin(event)}>
                로그인
              </button>
            </form>
          </div>
          <div className={styles.signup_link}>
            <Link to="/signup">회원가입</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
