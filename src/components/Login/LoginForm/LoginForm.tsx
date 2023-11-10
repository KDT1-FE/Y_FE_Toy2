import styled from "styled-components";
import LoginInput from "../LoginInput/LoginInput";
import { useState, useContext } from "react";
import FormInputBtn from "../../FormInputBtn/FormInputBtn";
import { postApi } from "../../../utils/postApi";
import Loader from "../../Loader/Loader";
import { AuthContext } from "../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const initialLoginData: LoginData = {
  id: "",
  password: ""
};

function LoginForm() {
  const [errorMessage, setErrorMessage] = useState("");
  const [loginData, setLoginData] = useState(initialLoginData);
  const [loading, setLoading] = useState(false);
  const { accessToken, setAccessToken } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const LOGIN_API_URL = "https://fastcampus-chat.net/login";
    setLoading(true);

    setTimeout(() => {
      postApi(LOGIN_API_URL, loginData)
        .then((data) => {
          const token = data.accessToken;
          const refreshToken = data.refreshToken;
          setAccessToken(token);
          sessionStorage.setItem("refreshToken", refreshToken);
          sessionStorage.setItem("userId", loginData.id)
          setLoading(false);
          navigate('/');
        })
        .catch((error) => {
          console.error(error);
          setErrorMessage("아이디와 비밀번호를 확인해주세요.");
          setLoading(false);
        });
    }, 1000);
  };

  return (
    <LoginContainer onSubmit={handleSubmit}>
      <Loader loading={loading}></Loader>
      <LoginInput
        id={"id"}
        label={"아이디"}
        setLoginData={setLoginData}
        inputProps={{
          type: "text",
          placeholder: "아이디를 입력해주세요."
        }}
      />
      <LoginInput
        id={"password"}
        label={"비밀번호"}
        setLoginData={setLoginData}
        inputProps={{
          type: "password",
          placeholder: "비밀번호를 입력해주세요."
        }}
      />
      <ErrorMessage>{errorMessage}</ErrorMessage>
      <FormInputBtn value={"로그인"} />
      <p>{accessToken ? "로그인 상태" : "로그아웃"}</p>
    </LoginContainer>
  );
}

export default LoginForm;

interface LoginData {
  id: string;
  password: string;
}

const LoginContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;

const ErrorMessage = styled.p`
  font-size: 12px;
  color: red;
  font-weight: 500;
  text-align: left;
  width: 100%;
`;
