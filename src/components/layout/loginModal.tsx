import React, { forwardRef, useImperativeHandle } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

interface LoginModalProps {}

export interface LoginModalRef {
  showModal: () => void;
}

const LoginModal: React.ForwardRefRenderFunction<
  LoginModalRef,
  LoginModalProps
> = (_, ref) => {
  const navigate = useNavigate();

  useImperativeHandle(ref, () => ({
    showModal: () => {
      // Your logic to show the modal
      console.log('Login modal is shown!');
      // Example: Navigate to the login page
      navigate('/');
    },
  }));

  return (
    <Container>
      <PageContainer>
        <Login onClick={() => navigate('/')}>로그인</Login>
        <SignUp onClick={() => navigate('/join')}>회원가입</SignUp>
      </PageContainer>
    </Container>
  );
};

const Container = styled.div`
  position: absolute;
  right: 16.8rem;
  margin-top: 3rem;
  width: 208px;
  height: 142px;
  border: 1px solid #e2e8f0;
  border-radius: 15px;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
`;

const PageContainer = styled.div``;

const Login = styled.div<React.HTMLProps<HTMLDivElement>>`
  margin: 0.7rem;
  line-height: 28px;
  text-align: left;
  font-size: 14px;
  font-weight: 400;

  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;

const SignUp = styled(Login)`
  border-bottom: 1px solid #e2e8f0;
`;
export default forwardRef(LoginModal);
