import { Link, useNavigate } from 'react-router-dom';
import styles from '@styles/pages/signin.module.scss';
import { login } from '@api/login';
import { useForm } from '@hooks/useForm';
import { useState } from 'react';
import { useAppDispatch } from '@/hooks/redux';
import { getUserId } from '@/store/userSlice';
import axios from 'axios';
import { jwtDecode } from "jwt-decode";

const Signin = () => {
  
  // const refreshToken = localStorage.getItem("refresh_token");
  // const accessToken = localStorage.getItem("access_token");

  // const axiosInstance = axios.create();
  // console.log(axiosInstance.defaults.headers.common)

  
  // const refreshAccessToken = async () => {
  //   const response = await axios.post('https://fastcampus-chat.net/refresh', {
  //     refreshToken, // You may need to obtain this from your current token
  //   });

  //   const newAccessToken = response.data.accessToken;

  //   axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;

  //   console.log(newAccessToken);
  //   return newAccessToken;
  // }


  // axiosInstance.interceptors.request.use(
  //   async (config) => {
  //     console.log(config.headers)
  //     const tokenExpirationThreshold = 60;
  //     const user = jwtDecode(accessToken); 
  //     console.log(user.exp)
  
  //     if (user && user.exp - Math.floor(Date.now() / 1000) < tokenExpirationThreshold) {

  //       const newAccessToken = await refreshAccessToken();
  
  //       config.headers['Authorization'] = `Bearer ${newAccessToken}`;
  //       console.log(config.headers.Authorization)
  //     }
  
  //     return config;
  //   },
  //   (error) => {
  //     return Promise.reject(error);
  //   }
  // );
  
  // // export default axiosInstance;



  // // console.log(decoded);

  const [id, onChangeId] = useForm();
  const [password, onChangePassword] = useForm();
  const [errors, setErrors] = useState('');

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // console.log(userId);

  const signin = async (event) => {
    event.preventDefault();

    const result = await login(id, password);
    const { accessToken, refreshToken } = result;
    if (result.error) {
      setErrors(result.error);
    } else {
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
