import { useEffect, useRef } from "react";
import styled from "styled-components";
import { ErrorData, FormInputProps } from "../SignUpForm/SignUpForm";

const ID_REGEX = new RegExp("[A-Za-z]{5,20}"); // 5~20글자 영문자만 입력 가능
const PW_REGEX = new RegExp("^[A-Za-z0-9]{8,16}$"); // 8~16글자 영문자, 숫자만 입력 가능
const NAME_REGEX = new RegExp("^[A-Za-z가-힣]{2,}$"); // 2글자 이상 영문자, 한글만 입력 가능

const ERROR_MSG: { [key: string]: string } = {
  required: "필수 정보입니다.",
  invalidId: "5~20자의 영문자만 입력 하세요.",
  invalidName: "2자 이상 영문 대 소문자, 숫자를 입력 하세요.",
  invalidPw: "8~16자 이상의 영문 대 소문자, 숫자를 입력하세요.",
  invalidPwCheck: "비밀번호가 일치하지 않습니다."
};

function SignUpInput({
  id,
  label,
  inputProps,
  formData,
  setFormData,
  errorData,
  setErrorData
}: FormInputProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const checkRegex = (inputId: keyof ErrorData) => {
    let result: string | true;
    const value = formData[inputId];
    if (value.length === 0) {
      result = "required";
    } else {
      switch (inputId) {
        case "id":
          result = ID_REGEX.test(value) ? true : "invalidId";
          break;
        case "name":
          result = NAME_REGEX.test(value) ? true : "invalidName";
          break;
        case "pw":
          result = PW_REGEX.test(value) ? true : "invalidPw";
          checkRegex("confirmPw");
          break;
        case "confirmPw":
          result = value === formData["pw"] ? true : "invalidPwCheck";
          break;
        default:
          return;
      }
    }
    setErrorData({
      ...errorData,
      [inputId]: result
    });
  };

  useEffect(() => {
    if (id === "id" && inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <SignUpInputContainer>
      <InputLabel htmlFor={id}>{label}</InputLabel>
      <Input
        id={id}
        ref={inputRef}
        value={formData[id]}
        onChange={(e) => setFormData({ ...formData, [id]: e.target.value })}
        onBlur={() => {
          checkRegex(id as keyof ErrorData);
        }}
        required
        {...inputProps}
      />
      <ErrorMessage>
        {typeof errorData[id] === "string"
          ? ERROR_MSG[errorData[id] as string]
          : ""}
      </ErrorMessage>
    </SignUpInputContainer>
  );
}

export default SignUpInput;

const SignUpInputContainer = styled.div`
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

const ErrorMessage = styled.p`
  font-size: 10px;
  color: red;
  font-weight: 500;
`;
