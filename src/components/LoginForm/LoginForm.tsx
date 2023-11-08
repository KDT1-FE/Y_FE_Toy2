import styled from "styled-components";
import LoginInput from "../LoginInput/LoginInput";
import { useState } from "react";
import FormInputBtn from "../FormInputBtn/FormInputBtn";

function LoginForm() {
  const [errorMessage, setErrorMessage] = useState("");
  return (
    <LoginContainer>
      <LoginInput id={"id"} label={"아이디"} />
      <LoginInput id={"pw"} label={"비밀번호"} />
      <ErrorMessage>{errorMessage}</ErrorMessage>
      <FormInputBtn value={"로그인"} />
    </LoginContainer>
  );
}

export default LoginForm;
export interface LoginInputProps {
  id: string;
  label: string;
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
