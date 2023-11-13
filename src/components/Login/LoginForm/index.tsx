import React from "react";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Input,
  Button,
  Box,
  Flex,
} from "@chakra-ui/react";
import styled from "styled-components";

const SignUpButton = styled.button`
  color: #e2e8f0;
  text-decoration: underline;
  text-align: center;
  display: block;
  margin: 0 auto;
  margin-top: 60px;
  border-radius: 1px;
`;

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
  toggleSignUpModal: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({
  idInput,
  pwInput,
  loginError,
  handleLogin,
  toggleSignUpModal,
}) => {
  // form 태그로 감싸서 제출 핸들러 추가
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    handleLogin();
  };

  return (
    <Flex justifyContent="flex-end" alignItems="center" height="100vh">
      <Box
        bg="black"
        p={8}
        mr={16}
        mb={16}
        shadow="md"
        borderRadius="md"
        width="36vw"
        height="40vh"
      >
        <form onSubmit={handleSubmit}>
          {loginError && (
            <Alert status="error">
              <AlertIcon />
              <AlertTitle mr={2}>로그인 실패</AlertTitle>
              <AlertDescription>{loginError}</AlertDescription>
            </Alert>
          )}
          <Flex
            direction="row"
            alignItems="center"
            justify="center"
            align="stretch"
            mt={10}
          >
            <Flex direction="column" flex="1" mr={4}>
              <Input
                type="text"
                placeholder="아이디"
                value={idInput.value}
                onChange={idInput.onChange}
                autoComplete="username"
                mb={6}
                height="6vh"
                sx={{ color: "white" }}
              />
              <Input
                type="password"
                placeholder="비밀번호"
                value={pwInput.value}
                onChange={pwInput.onChange}
                autoComplete="current-password"
                height="6vh"
                sx={{ color: "white" }}
              />
            </Flex>
            <Button type="submit" width="8vw" height="15vh" borderRadius={2}>
              로그인
            </Button>
          </Flex>
          <SignUpButton type="button" onClick={toggleSignUpModal}>
            회원가입
          </SignUpButton>
        </form>
      </Box>
    </Flex>
  );
};

export default LoginForm;
