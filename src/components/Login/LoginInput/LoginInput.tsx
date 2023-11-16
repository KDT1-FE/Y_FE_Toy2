import styled from "styled-components";
import { LoginData } from "../LoginForm/LoginForm";

function LoginInput({ id, label, setLoginData, inputProps }: LoginInputProps) {
  return (
    <LoginInputContainer>
      <InputLabel htmlFor={id}>{label}</InputLabel>
      <Input
        id={id}
        onChange={(e) => {
          setLoginData((prev) => ({ ...prev, [id]: e.target.value }));
        }}
        {...inputProps}
      />
    </LoginInputContainer>
  );
}

export default LoginInput;

interface LoginInputProps {
  id: string;
  label: string;
  setLoginData: React.Dispatch<React.SetStateAction<LoginData>>;
  inputProps: {
    type: string;
    placeholder: string;
  };
}

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
