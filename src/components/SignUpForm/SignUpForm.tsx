import styled from "styled-components";
import FormInput from "../FormInput/FormInput";
import { FormInputBtn } from "../FormInputBtn/FormInputBtn";

export const SignUpForm = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("#");
  };
  return (
    <SignUpContainer onSubmit={handleSubmit}>
      <FormInput
        id={"id"}
        label={"아이디"}
        inputProps={{
          type: "text",
          placeholder: "영어로 입력해주세요."
        }}
      />
      <FormInput
        id={"name"}
        label={"이름"}
        inputProps={{
          type: "text",
          placeholder: "이름을 입력해주세요."
        }}
      />
      <FormInput
        id={"pw"}
        label={"비밀번호"}
        inputProps={{
          type: "password",
          placeholder: "5글자 이상 입력해주세요."
        }}
      />
      <FormInput
        id={"confirmPw"}
        label={"비밀번호 확인"}
        inputProps={{
          type: "password",
          placeholder: "비밀번호와 동일하게 입력해주세요."
        }}
      />
      <FormInputBtn value={"완료"} />
    </SignUpContainer>
  );
};

const SignUpContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;
