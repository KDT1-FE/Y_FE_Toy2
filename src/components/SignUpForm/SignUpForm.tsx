import styled from "styled-components";
import FormInput from "../SignUpInput/SignUpInput";
import { FormInputBtn } from "../FormInputBtn/FormInputBtn";
import { useState } from "react";

const initialErrorData: ErrorDataType = {
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
      <FormInput
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
      <FormInput
        id={"name"}
        label={"이름"}
        formData={formData}
        setFormData={setFormData}
        errorData={errorData}
        setErrorData={setErrorData}
        inputProps={{
          type: "text",
          placeholder: "이름을 입력해주세요."
        }}
      />
      <FormInput
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
      <FormInput
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

export interface FormInputPropsType {
  id: string;
  label: string;
  formData: FormDataType;
  setFormData: (data: FormDataType) => void;
  errorData: ErrorDataType;
  setErrorData: (error: ErrorDataType) => void;
  inputProps: {
    type: string;
    placeholder: string;
  };
}

interface FormDataType {
  id: string;
  name: string;
  pw: string;
  confirmPw: string;
  [key: string]: string;
}

export interface ErrorDataType {
  id: string;
  name: string;
  pw: string;
  confirmPw: string;
  [key: string]: string | true;
}

const SignUpContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;
