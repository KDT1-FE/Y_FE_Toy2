import React from "react";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Input,
  Button,
} from "@chakra-ui/react";

interface InputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

interface LoginFormProps {
  idInput: InputProps;
  pwInput: InputProps;
  loginError: string;
  setLoginError: React.Dispatch<React.SetStateAction<string>>;
  handleLogin: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({
  idInput,
  pwInput,
  loginError,
  handleLogin,
}) => {
  // form 태그로 감싸서 제출 핸들러 추가
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    handleLogin();
  };

  return (
    <form onSubmit={handleSubmit}>
      {loginError && (
        <Alert status="error">
          <AlertIcon />
          <AlertTitle mr={2}>로그인 실패</AlertTitle>
          <AlertDescription>{loginError}</AlertDescription>
        </Alert>
      )}
      <Input
        type="text"
        placeholder="아이디"
        value={idInput.value}
        onChange={idInput.onChange}
        autoComplete="username"
      />
      <Input
        type="password"
        placeholder="비밀번호"
        value={pwInput.value}
        onChange={pwInput.onChange}
        autoComplete="current-password"
      />
      <Button onClick={handleLogin}>로그인</Button>
    </form>
  );
};

export default LoginForm;
