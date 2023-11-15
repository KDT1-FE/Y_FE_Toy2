import { Flex, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import styled from "styled-components";
import backgroundImage from "../../assets/bg.png";
import LoginForm from "../../components/Login/LoginForm";
import SignUpModal from "../../components/Login/SignUpModal/index";
import useInput from "../../hooks/useInput";

const Background = styled.div`
  background-image: url(${backgroundImage});
  background-color: #ecedee;
  background-position: left top;
  background-repeat: no-repeat;
  height: 100vh;
  overflow: hidden;
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
  box-sizing: border-box;
`;

const Title = styled.div`
  color: #000;
  font-family: "Kelly Slab", serif;
  font-size: 6vw;
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
  letter-spacing: -0.408px;
  display: flex;
  width: 40vw;
  height: 20vh;
  flex-direction: column;
  justify-content: center;
  flex-shrink: 0;
  margin-right: 20px;
  margin-top: 120px;
  align-self: flex-start;
`;

const Copyright = styled.div`
  position: absolute;
  bottom: 20px;
  width: 100%;
  text-align: right;
  padding-right: 18vw;
  color: #999;
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

  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  // 모달 토글
  const toggleSignUpModal = () => {
    setIsSignUpModalOpen(!isSignUpModalOpen);
  };

  return (
    <Background>
      <Flex
        direction="column"
        alignItems="center"
        justifyContent="center"
        height="100vh"
      >
        <Title>LIAR GAME</Title>
        <LoginForm
          idInput={idInput}
          pwInput={pwInput}
          toggleSignUpModal={toggleSignUpModal}
        />
        {isSignUpModalOpen && (
          <SignUpModal isOpen={isSignUpModalOpen} onClose={toggleSignUpModal} />
        )}
      </Flex>
      <Copyright>
        <Text>&copy; {new Date().getFullYear()} 빼빼로조</Text>
      </Copyright>
    </Background>
  );
};

export default Login;
