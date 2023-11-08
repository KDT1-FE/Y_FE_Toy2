import styled from "styled-components";
import { LoginInputProps } from "../LoginForm/LoginForm";

function LoginInput({ id, label }: LoginInputProps) {
  return (
    <LoginInputContainer>
      <InputLabel htmlFor={id}>{label}</InputLabel>
      <Input id={id} />
    </LoginInputContainer>
  );
}

export default LoginInput;

const LoginInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
const InputLabel = styled.label`
  font-size: 12px;
  font-weight: 700;
  margin-bottom: 6px;
`;
const Input = styled.input`
  font-size: 16px;
  padding: 6px;
  margin-bottom: 3px;
  border: 1px solid #dddddd;
  box-shadow: rgba(0, 0, 0, 0.15) 0.5px 0.5px 1px;
  border-radius: 5px;
  outline: none;
  &::placeholder {
    font-size: 12px;
  }

  &:focus {
    outline: 2px solid #3b89ff;
  }
`;
