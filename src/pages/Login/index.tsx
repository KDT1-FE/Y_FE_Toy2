import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Button,
  CloseButton,
  Input,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import useFetch from "../../hooks/useFetch";
import useInput from "../../hooks/useInput";
import SignUpModal from "../../components/Login/SignUpModal/index";

const Login = () => {
  const idInput = useInput("");
  const pwInput = useInput("");
  const { setToken } = useAuth();
  const navigate = useNavigate();
  const login = useFetch({
    url: "https://fastcampus-chat.net/login",
    method: "POST",
    data: { id: idInput.value, password: pwInput.value },
    start: false,
  });
  const [loginError, setLoginError] = useState("");

  const handleLogin = () => {
    login.refresh();
  };

  useEffect(() => {
    if (login.result && login.statusCode === 200) {
      const { accessToken, refreshToken } = login.result;
      if (accessToken && refreshToken) {
        setToken(accessToken, refreshToken).then(() => {
          navigate("/main");
        });
      }
    } else if (login.result && login.statusCode !== 200) {
      setLoginError("로그인에 실패했습니다. 아이디와 비밀번호를 확인해주세요.");
    }
  }, [login.result, login.statusCode, setToken, navigate]);

  return (
    <>
      <div>로그인</div>
      {loginError && (
        <Alert status="error">
          <AlertIcon />
          <AlertTitle mr={2}>로그인 실패</AlertTitle>
          <AlertDescription>{loginError}</AlertDescription>
          <CloseButton
            position="absolute"
            right="8px"
            top="8px"
            onClick={() => setLoginError("")}
          />
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
      <SignUpModal />
    </>
  );
};

export default Login;
