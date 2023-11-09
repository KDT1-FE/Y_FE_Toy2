import styled from "styled-components";
import SignUpInput, { ErrorData } from "../SignUpInput/SignUpInput";
import { useEffect, useState } from "react";
import FormInputBtn from "../../FormInputBtn/FormInputBtn";
import Loader from "../../Loader/Loader";
import axios from "axios";
import { apiHeader } from "../../../utils/apiHeader";
import { AuthContext } from "../../../hooks/useAuth";

const initialErrorData = {
  id: "",
  password: "",
  name: "",
  confirmPw: ""
};

const initialFormData = {
  id: "",
  password: "",
  name: "",
  confirmPw: ""
};

function SignUpForm() {
  const [loading, setLoading] = useState(false);
  const [errorData, setErrorData] = useState(initialErrorData);
  const [formData, setFormData] = useState(initialFormData);
  const [passedValidation, setPassedValidation] = useState(false);

  useEffect(() => {
    setPassedValidation(
      Object.values(errorData).every((value) => value === "passed")
    );
  }, [errorData]);

  const updateErrorDataKey = (errorData: ErrorData) => {
    const updateErrorData = { ...errorData };

    for (const key in updateErrorData) {
      if (updateErrorData[key] === "") {
        updateErrorData[key] = "required";
      }
    }

    setErrorData(updateErrorData);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    updateErrorDataKey(errorData);

    if (!passedValidation) {
      alert("모든 문항을 정확히 입력해주세요.");
      setLoading(false);
      return;
    } else {
      const { confirmPw, ...requestBody } = formData;
      const SIGN_UP_API_URL = "https://fastcampus-chat.net/signup";
      setTimeout(() => {
        try {
          axios
            .post(SIGN_UP_API_URL, requestBody, { headers: apiHeader })
            .then((response) => {
              if (response.data.message === "User created") {
                alert("회원가입 성공");
              } else {
                alert("회원가입 실패");
                console.error(response.data.message);
              }
            });
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      }, 1000);
    }
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
          placeholder: "영문 또는 숫자로 5글자 이상 입력해주세요."
        }}
        className={`${
          errorData["id"] === "passed"
            ? "passed"
            : errorData["id"] === "invalidId" ||
              errorData["id"] === "required" ||
              errorData["id"] === "duplicated"
            ? "error"
            : ""
        }`}
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
          placeholder: "영문 또는 한글로 2글자 이상 입력해주세요."
        }}
        className={`${
          errorData["name"] === "passed"
            ? "passed"
            : errorData["name"] === "invalidName" ||
              errorData["name"] === "required"
            ? "error"
            : ""
        }`}
      />
      <SignUpInput
        id={"password"}
        label={"비밀번호"}
        formData={formData}
        setFormData={setFormData}
        errorData={errorData}
        setErrorData={setErrorData}
        inputProps={{
          type: "password",
          placeholder: "8~16자 영문 대 소문자, 숫자를 입력해주세요."
        }}
        className={`${
          errorData["password"] === "passed"
            ? "passed"
            : errorData["password"] === "invalidPw" ||
              errorData["password"] === "required"
            ? "error"
            : ""
        }`}
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
        className={`${
          errorData["confirmPw"] === "passed"
            ? "passed"
            : errorData["confirmPw"] === "invalidPwCheck" ||
              errorData["confirmPw"] === "required"
            ? "error"
            : ""
        }`}
      />
      <FormInputBtn value={"완료"} />
      <Loader loading={loading} />
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
