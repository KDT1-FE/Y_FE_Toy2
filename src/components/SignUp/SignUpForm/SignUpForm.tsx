import styled from "styled-components";
import SignUpInput, { ErrorData } from "../SignUpInput/SignUpInput";
import { useEffect, useState } from "react";
import FormInputBtn from "../../FormInputBtn/FormInputBtn";
import Loader from "../../Loader/Loader";
import axios from "axios";
import { apiHeader } from "../../../utils/apiHeader";
import { useNavigate } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../../firebase/firebase";

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
  confirmPw: "",
  picture:
    "data:image/jpeg;base64,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"
};

function SignUpForm() {
  const [loading, setLoading] = useState(false);
  const [errorData, setErrorData] = useState(initialErrorData);
  const [formData, setFormData] = useState(initialFormData);
  const [passedValidation, setPassedValidation] = useState(false);
  const navigate = useNavigate();
  console.log(formData);
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
                navigate("/login");
                const user = {
                  id: formData.id,
                  name: formData.name,
                  profileImgUrl:
                    "data:image/jpeg;base64,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",
                  backgroundImgUrl:
                    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAyAAAAHCCAIAAACYATqfAAAIB0lEQVR42u3WMQHAQAzEsGv5cwq1J+FRguDJ390NAIDOryUAQMtgAQDEDBYAQMxgAQDEDBYAQMxgAQDEDBYAQMxgAQDEDBYAQMxgAQDEDBYAQMxgAQDEDBYAQMxgAQDEDBYAQMxgAQDEDBYAQMxgAQDEDBYAQMxgAQDEDBYAQMxgAQDEDBYAQMxgAQDEDBYAQMxgAQDEDBYAQMxgAQDEDBYAQMxgAQDEDBYAQMxgAQDEDBYAQMxgAQDEDBYAQMxgAQDEDBYAQMxgAQDEDBYAQMxgAQDEDBYAQMxgAQDEDBYAQMxgAQDEDBYAQMxgAQDEDBYAQMxgAQDEDBYAQMxgAQDEDBYAQMxgAQDEDBYAQMxgAQDEDBYAQMxgAQDEDBYAQMxgAQDEDBYAQMxgAQDEDBYAQMxgAQDEDBYAQMxgAQDEDBYAQMxgAQDEDBYAQMxgAQDEDBYAQMxgAQDEDBYAQMxgAQDEDBYAQMxgAQDEDBYAQMxgAQDEDBYAQMxgAQDEDBYAQMxgAQDEDBYAQMxgAQDEDBYAQMxgAQDEDBYAQMxgAQDEDBYAQMxgAQDEDBYAQMxgAQDEDBYAQMxgAQDEDBYAQMxgAQDEDBYAQMxgAQDEDBYAQMxgAQDEDBYAQMxgAQDEDBYAQMxgAQDEDBYAQMxgAQDEDBYAQMxgAQDEDBYAQMxgAQDEDBYAQMxgAQDEDBYAQMxgAQDEDBYAQMxgAQDEDBYAQMxgAQDEDBYAQMxgAQDEDBYAQMxgAQDEDBYAQMxgAQDEDBYAQMxgAQDEDBYAQMxgAQDEDBYAQMxgAQDEDBYAQMxgAQDEDBYAQMxgAQDEDBYAQMxgAQDEDBYAQMxgAQDEDBYAQMxgAQDEDBYAQMxgAQDEDBYAQMxgAQDEDBYAQMxgAQDEDBYAQMxgAQDEDBYAQMxgAQDEDBYAQMxgAQDEDBYAQMxgAQDEDBYAQMxgAQDEDBYAQMxgAQDEDBYAQMxgAQDEDBYAQMxgAQDEDBYAQMxgAQDEDBYAQMxgAQDEDBYAQMxgAQDEDBYAQMxgAQDEDBYAQMxgAQDEDBYAQMxgAQDEDBYAQMxgAQDEDBYAQMxgAQDEDBYAQMxgAQDEDBYAQMxgAQDEDBYAQMxgAQDEDBYAQMxgAQDEDBYAQMxgAQDEDBYAQMxgAQDEDBYAQMxgAQDEDBYAQMxgAQDEDBYAQMxgAQDEDBYAQMxgAQDEDBYAQMxgAQDEDBYAQMxgAQDEDBYAQMxgAQDEDBYAQMxgAQDEDBYAQMxgAQDEDBYAQMxgAQDEDBYAQMxgAQDEDBYAQMxgAQDEDBYAQMxgAQDEDBYAQMxgAQDEDBYAQMxgAQDEDBYAQMxgAQDEDBYAQMxgAQDEDBYAQMxgAQDEDBYAQMxgAQDEDBYAQMxgAQDEDBYAQMxgAQDEDBYAQMxgAQDEDBYAQMxgAQDEDBYAQMxgAQDEDBYAQMxgAQDEDBYAQMxgAQDEDBYAQMxgAQDEDBYAQMxgAQDEDBYAQMxgAQDEDBYAQMxgAQDEDBYAQMxgAQDEDBYAQMxgAQDEDBYAQMxgAQDEDBYAQMxgAQDEDBYAQMxgAQDEDBYAQMxgAQDEDBYAQMxgAQDEDBYAQMxgAQDEDBYAQMxgAQDEDBYAQMxgAQDEDBYAQMxgAQDEDBYAQMxgAQDEDBYAQMxgAQDEDBYAQMxgAQDEDBYAQMxgAQDEDBYAQMxgAQDEDBYAQMxgAQDEDBYAQMxgAQDEDBYAQMxgAQDEDBYAQMxgAQDEDBYAQMxgAQDEDBYAQMxgAQDEDBYAQMxgAQDEDBYAQMxgAQDEDBYAQMxgAQDEDBYAQMxgAQDEDBYAQMxgAQDEDBYAQMxgAQDEDBYAQMxgAQDEDBYAQMxgAQDEDBYAQMxgAQDEDBYAQMxgAQDEDBYAQMxgAQDEDBYAQMxgAQDEDBYAQMxgAQDEDBYAQMxgAQDEDBYAQMxgAQDEDBYAQMxgAQDEDBYAQMxgAQDEDBYAQMxgAQDEDBYAQMxgAQDEDBYAQMxgAQDEDBYAQMxgAQDEDBYAQMxgAQDEDBYAQMxgAQDEDBYAQMxgAQDEDBYAQMxgAQDEDBYAQMxgAQDEDBYAQMxgAQDEDBYAQMxgAQDEDBYAQMxgAQDEDBYAQMxgAQDEDBYAQMxgAQDEDBYAQMxgAQDEDBYAQMxgAQDEDBYAQMxgAQDEDBYAQMxgAQDEDBYAQMxgAQDEDBYAQMxgAQDEDBYAQMxgAQDEDBYAQMxgAQDEDBYAQMxgAQDEDBYAQMxgAQDEDBYAQMxgAQDEDBYAQMxgAQDEDBYAQMxgAQDEDBYAQMxgAQDEDBYAQMxgAQDEDBYAQMxgAQDEDBYAQMxgAQDEDBYAQMxgAQDEDBYAQMxgAQDEDBYAQMxgAQDEDBYAQMxgAQDEDBYAQMxgAQDEDBYAQMxgAQDEDBYAQMxgAQDEDBYAQMxgAQDEDBYAQMxgAQDEDBYAQMxgAQDEDBYAQMxgAQDEDBYAQMxgAQDEDBYAQMxgAQDEDBYAQMxgAQDEDBYAQMxgAQDEDBYAQMxgAQDEDBYAQMxgAQDEDBYAQMxgAQDEDBYAQMxgAQDEDBYAQMxgAQDEDBYAQMxgAQDEDBYAQMxgAQDEDBYAQMxgAQDEDBYAQMxgAQDEDBYAQMxgAQDEDBYAQMxgAQDEDBYAQMxgAQDEDBYAQMxgAQDEDBYAQMxgAQDEDBYAQMxgAQDEDBYAQGnbA+DhBcGF1cmaAAAAAElFTkSuQmCC",
                  introText: "",
                  hobby: []
                };
                const userRef = doc(db, "Users", formData.id);
                setDoc(userRef, user, { merge: true });
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
