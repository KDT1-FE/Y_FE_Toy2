import styled from "styled-components";
import LoginForm from "../../components/LoginForm/LoginForm";

function Login() {
  return (
    <LoginContainer>
      <Title>로그인</Title>
      <LoginForm />
    </LoginContainer>
  );
}

export default Login;

const LoginContainer = styled.div`
  max-width: 360px;
  margin: 0 auto;
  width: 90%;
  display: flex;
  flex-direction: column;
  gap: 16px;
  border: 1px solid #ccc;
  padding: 50px 30px;
  margin-top: 20vh;
`;

const Title = styled.h2`
  font-size: 24px;
  text-align: center;
`;
