import styled from "styled-components";
import LoginInput from "../LoginInput/LoginInput";
import { useState } from "react";
import FormInputBtn from "../../FormInputBtn/FormInputBtn";
import { postApi } from "../../../utils/postApi";

const initialLoginData = {
  id: "",
  password: ""
};

function LoginForm() {
  const [errorMessage, setErrorMessage] = useState("");
  const [loginData, setLoginData] = useState(initialLoginData);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const LOGIN_API_URL = "https://fastcampus-chat.net/login";

    postApi(LOGIN_API_URL, loginData)
      .then((data) => {
        console.log("로그인 성공");
        const token = data.accessToken;
        sessionStorage.setItem("token", token);
      })
      .catch((error) => {
        console.log("로그인 실패");
        console.error(error);
        setErrorMessage("아이디와 비밀번호를 확인해주세요.");
      });
  };

  return (
    <LoginContainer onSubmit={handleSubmit}>
      <LoginInput
        id={"id"}
        label={"아이디"}
        loginData={loginData}
        setLoginData={setLoginData}
        inputProps={{
          type: "text",
          placeholder: "아이디를 입력해주세요."
        }}
      />
      <LoginInput
        id={"password"}
        label={"비밀번호"}
        loginData={loginData}
        setLoginData={setLoginData}
        inputProps={{
          type: "password",
          placeholder: "비밀번호를 입력해주세요."
        }}
      />
      <ErrorMessage>{errorMessage}</ErrorMessage>
      <FormInputBtn value={"로그인"} />
    </LoginContainer>
  );
}

export default LoginForm;

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
