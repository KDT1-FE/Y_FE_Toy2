import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import useFetch from "../../hooks/useFetch";
import useInput from "../../hooks/useInput";
import SignUpModal from "../../components/Login/SignUpModal/index";
import LoginForm from "../../components/Login/LoginForm";
import styled from "styled-components";
import backgroundImage from "../../assets/bg.png";

const Background = styled.div`
  background-image: url(${backgroundImage});
  background-position: left top;
  background-repeat: no-repeat;
  height: 100vh;
  overflow: hidden;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  box-sizing: border-box;
`;

const Login = () => {
  //로그인 페이지에서만 #root 스타일 적용 안함
  useEffect(() => {
    const root = document.getElementById("root");
    if (root) {
      root.style.margin = "0"; // 로그인 페이지에 대한 마진 설정 변경,
      root.style.maxWidth = "100%"; // max-width 수정

      return () => {
        root.style.margin = "0 auto"; // 로그인 페이지가 언마운트될 때 원래 마진으로 복원
        root.style.maxWidth = "1200px";
      };
    }
  }, []);
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

  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  // 모달 토글
  const toggleSignUpModal = () => {
    setIsSignUpModalOpen(!isSignUpModalOpen);
  };

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
    <Background>
      <LoginForm
        idInput={idInput}
        pwInput={pwInput}
        loginError={loginError}
        setLoginError={setLoginError}
        handleLogin={handleLogin}
        toggleSignUpModal={toggleSignUpModal}
      />
      {isSignUpModalOpen && (
        <SignUpModal isOpen={isSignUpModalOpen} onClose={toggleSignUpModal} />
      )}
    </Background>
  );
};

export default Login;
