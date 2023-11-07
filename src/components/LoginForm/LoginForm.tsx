import styled from "styled-components";
import FormInput from "../FormInput/FormInput";

export const LoginForm = () => {
  return (
    <LoginContainer>
      <FormInput
        id={"id"}
        label={"아이디"}
        inputProps={{ type: "text", placeholder: "아이디를 입력해주세요." }}
      />
      <FormInput
        id={"pw"}
        label={"비밀번호"}
        inputProps={{
          type: "password",
          placeholder: "비밀번호를 입력해주세요."
        }}
      />
    </LoginContainer>
  );
};

const LoginContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
