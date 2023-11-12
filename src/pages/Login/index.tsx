import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import useFetch from "../../hooks/useFetch";
import useInput from "../../hooks/useInput";
import SignUpModal from "../../components/Login/SignUpModal/index";
import LoginForm from "../../components/Login/LoginForm";

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
    <>
      <div>로그인</div>
      <LoginForm
        idInput={idInput}
        pwInput={pwInput}
        loginError={loginError}
        setLoginError={setLoginError}
        handleLogin={handleLogin}
      />
      <button onClick={toggleSignUpModal}>회원가입</button>
      {isSignUpModalOpen && (
        <SignUpModal isOpen={isSignUpModalOpen} onClose={toggleSignUpModal} />
      )}
    </>
  );
};

export default Login;
