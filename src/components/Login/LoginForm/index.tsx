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
  return (
    <>
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
      />
      <Input
        type="password"
        placeholder="비밀번호"
        value={pwInput.value}
        onChange={pwInput.onChange}
      />
      <Button onClick={handleLogin}>로그인</Button>
    </>
  );
};

export default LoginForm;
