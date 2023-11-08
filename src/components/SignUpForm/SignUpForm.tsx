import styled from "styled-components";
import SignUpInput from "../SignUpInput/SignUpInput";
import { useState } from "react";
import FormInputBtn from "../FormInputBtn/FormInputBtn";

const initialErrorData = {
  id: "",
  name: "",
  pw: "",
  confirmPw: ""
};

const initialFormData = {
  id: "",
  name: "",
  pw: "",
  confirmPw: ""
};

function SignUpForm() {
  const [errorData, setErrorData] = useState(initialErrorData);
  const [formData, setFormData] = useState(initialFormData);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <SignUpContainer onSubmit={handleSubmit}>
      <SignUpInput
        id={"id"}
        label={"아이디"}
        formData={formData}
        setFormData={setFormData}
        errorData={errorData}
        setErrorData={setErrorData}
        inputProps={{
          type: "text",
          placeholder: "영어로 입력해주세요."
        }}
      />
      <SignUpInput
        id={"name"}
        label={"이름"}
        formData={formData}
        setFormData={setFormData}
        errorData={errorData}
        setErrorData={setErrorData}
        inputProps={{
          type: "text",
          placeholder: "2글자 이상 입력해주세요."
        }}
      />
      <SignUpInput
        id={"pw"}
        label={"비밀번호"}
        formData={formData}
        setFormData={setFormData}
        errorData={errorData}
        setErrorData={setErrorData}
        inputProps={{
          type: "password",
          placeholder: "8~16자 영문 대 소문자, 숫자를 입력해주세요."
        }}
      />
      <SignUpInput
        id={"confirmPw"}
        label={"비밀번호 확인"}
        formData={formData}
        setFormData={setFormData}
        errorData={errorData}
        setErrorData={setErrorData}
        inputProps={{
          type: "password",
          placeholder: "비밀번호와 동일하게 입력해주세요."
        }}
      />
      <FormInputBtn value={"완료"} />
    </SignUpContainer>
  );
}

export default SignUpForm;

const SignUpContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;
