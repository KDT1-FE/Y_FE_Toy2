import { useEffect, useRef } from "react";
import styled from "styled-components";
import { postApi } from "../../../utils/postApi";

const ID_REGEX = new RegExp("^[A-Za-z0-9]{5,20}$"); // 5~20글자 영문자만 입력 가능
const PW_REGEX = new RegExp("^[A-Za-z0-9]{8,16}$"); // 8~16글자 영문자, 숫자만 입력 가능
const NAME_REGEX = new RegExp("^[A-Za-z가-힣]{2,20}$"); // 2글자 이상 영문자, 한글만 입력 가능

const ERROR_MSG: { [key: string]: string } = {
  required: "필수 정보입니다.",
  invalidId: "5~20자의 영문, 숫자만 5글자 이상 입력 하세요.",
  duplicated: "중복된 아이디가 존재합니다.",
  invalidName: "2자 이상 영문 대 소문자, 한글을 입력 하세요.",
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
  setErrorData,
  className
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
          result = ID_REGEX.test(value) ? "passed" : "invalidId";
          break;
        case "name":
          result = NAME_REGEX.test(value) ? "passed" : "invalidName";
          break;
        case "password":
          result = PW_REGEX.test(value) ? "passed" : "invalidPw";
          result === "passed" && formData["confirmPw"].length !== 0
            ? checkRegex("confirmPw")
            : "";
          break;
        case "confirmPw":
          result = value === formData["password"] ? "passed" : "invalidPwCheck";
          break;
        default:
          return;
      }
    }

    setErrorData((prev) => ({
      ...prev,
      [inputId]: result
    }));
  };

  const checkDuplicateId = async (inputId: keyof ErrorData) => {
    if (inputId === "id" && errorData.id !== "required") {
      const { id } = formData;
      const requestBody = { id };
      const CHECK_DUPLICATE_API_URL = "https://fastcampus-chat.net/check/id";

      postApi(CHECK_DUPLICATE_API_URL, requestBody)
        .then((data) => {
          if (data.isDuplicated) {
            setErrorData((prev) => ({
              ...prev,
              [inputId]: "duplicated"
            }));
          } else {
            setErrorData((prev) => ({
              ...prev,
              [inputId]: "passed"
            }));
            checkRegex("id");
          }
        })
        .catch((error) => {
          console.error("오류 발생:", error);
        });
    }
  };

  // useEffect(() => {
  //   if (id === "id" && inputRef.current) {
  //     inputRef.current.focus();
  //   }
  // }, []);

  return (
    <SignUpInputContainer>
      <InputLabel htmlFor={id}>{label}</InputLabel>
      <Input
        className={className}
        id={id}
        ref={inputRef}
        onChange={(e) =>
          setFormData((prev) => ({ ...prev, [id]: e.target.value }))
        }
        onBlur={() => {
          checkDuplicateId(id as keyof ErrorData);
          checkRegex(id as keyof ErrorData);
        }}
        {...inputProps}
      />
      <ErrorMessage>
        {typeof errorData[id] === "string"
          ? ERROR_MSG[errorData[id] as string]
          : ""}
      </ErrorMessage>

      {className === "passed" ? (
        <PassedMessage>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Icons8_flat_checkmark.svg/512px-Icons8_flat_checkmark.svg.png"
            alt=""
          />
        </PassedMessage>
      ) : (
        ""
      )}
    </SignUpInputContainer>
  );
}

export default SignUpInput;

interface FormInputProps {
  id: string;
  label: string;
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  errorData: ErrorData;
  setErrorData: React.Dispatch<React.SetStateAction<ErrorData>>;
  inputProps: {
    type: string;
    placeholder: string;
  };
  className: string;
}

interface FormData {
  id: string;
  name: string;
  password: string;
  confirmPw: string;
  [key: string]: string;
}

export interface ErrorData {
  id: string;
  name: string;
  password: string;
  confirmPw: string;
  [key: string]: string | true;
}

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

  &.passed {
    outline: 2px solid #5fd87d;
  }

  &.error {
    outline: 2px solid red;
    animation: shake 0.1s 3;

    @keyframes shake {
      0%,
      100% {
        transform: translateX(0);
      }
      25% {
        transform: translateX(-2px);
      }
      50% {
        transform: translateX(2px);
      }
      75% {
        transform: translateX(-2px);
      }
    }
  }

  &::placeholder {
    font-size: 12px;
  }

  &:focus {
    outline: 2px solid #3b89ff;
  }
`;

const ErrorMessage = styled.p`
  font-size: 12px;
  color: red;
  font-weight: 500;
`;

const PassedMessage = styled.div`
  width: 12px;
  height: 12px;

  > img {
    width: 100%;
    height: 100%;
  }
`;
