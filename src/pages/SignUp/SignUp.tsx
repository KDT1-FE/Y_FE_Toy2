import styled from "styled-components";
import { SignUpForm } from "../../components/SignUpForm/SignUpForm";

function SignUp() {
  return (
    <SignUpContainer>
      <Title>회원가입</Title>
      <SignUpForm />
    </SignUpContainer>
  );
}

export default SignUp;

const SignUpContainer = styled.div`
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
  margin: 0;
`;
