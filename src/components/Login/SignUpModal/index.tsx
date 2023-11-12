import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Input, Button, Text, Alert, AlertIcon } from "@chakra-ui/react";
import useFetch from "../../../hooks/useFetch";
import axios from "axios";

interface FormData {
  id: string;
  password: string;
  name: string;
  picture?: string;
}

const SignUpModal = () => {
  const {
    control,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<FormData>();
  const signUpFetch = useFetch({
    url: "https://fastcampus-chat.net/signup",
    method: "POST",
    data: {},
    start: false,
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [signUpStatus, setSignUpStatus] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const checkIdDuplication = async (id: string): Promise<boolean> => {
    try {
      const response = await axios.post(
        "https://fastcampus-chat.net/check/id",
        { id },
      );
      return response.data.isDuplicated;
    } catch (error) {
      console.error("Error checking ID duplication", error);
      return false;
    }
  };

  // 회원가입 제출
  const onSubmit = async (formData: FormData) => {
    let pictureAsString: string | undefined;

    // 파일을 Base64 문자열로 변환
    const toBase64 = (file: File) =>
      new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
      });

    if (selectedFile) {
      pictureAsString = await toBase64(selectedFile);
    }

    const dataToSend = {
      ...formData,
      picture: pictureAsString,
    };
    // 회원가입 요청 및 결과 처리
    try {
      const response = await axios.post(
        "https://fastcampus-chat.net/signup",
        dataToSend,
        {
          headers: {
            "content-type": "application/json",
            serverId: import.meta.env.VITE_APP_SERVER_ID,
          },
        },
      );
      if (response.status === 200) {
        console.log("회원가입 성공:", response.data);
        setSignUpStatus({
          type: "success",
          message: "회원가입에 성공하였습니다.",
        });
      }
    } catch (error) {
      console.error("회원가입 실패:", error);
      setSignUpStatus({ type: "error", message: "회원가입에 실패하였습니다." });
    }
  };

  return (
    <>
      <div>회원가입</div>
      {signUpStatus && (
        <Alert status={signUpStatus.type}>
          <AlertIcon />
          {signUpStatus.message}
        </Alert>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="picture"
          control={control}
          render={({ field: { onChange } }) => (
            <Input
              type="file"
              accept="image/*"
              onChange={(event) => {
                const file = event.target.files?.[0];
                if (file) {
                  if (file.size > 1024 * 1024) {
                    console.error("File size exceeds 1MB");
                  } else {
                    setSelectedFile(file);
                    onChange(file);
                  }
                }
              }}
            />
          )}
        />
        <Controller
          name="id"
          control={control}
          rules={{
            required: "ID는 필수입니다.",
            pattern: {
              value: /^[A-Za-z0-9]+$/,
              message: "ID는 영문자와 숫자만 사용할 수 있습니다.",
            },
            validate: async (id) => {
              try {
                const isDuplicated = await checkIdDuplication(id);
                if (isDuplicated) {
                  setError("id", {
                    type: "manual",
                    message: "이미 사용중인 ID입니다.",
                  });
                  return false;
                }
                clearErrors("id");
                return true;
              } catch (error) {
                console.error("ID 중복 확인 중 오류 발생:", error);
                return "ID 중복 확인 중 오류가 발생했습니다.";
              }
            },
          }}
          render={({ field }) => (
            <Input type="text" placeholder="ID" {...field} />
          )}
        />
        {errors.id && <Text color="red.500">{errors.id.message}</Text>}

        <Controller
          name="password"
          control={control}
          rules={{
            required: "비밀번호는 필수입니다.",
            minLength: {
              value: 5,
              message: "비밀번호는 5자리 이상이어야 합니다.",
            },
          }}
          render={({ field }) => (
            <Input type="password" placeholder="Password" {...field} />
          )}
        />
        {errors.password && (
          <Text color="red.500">{errors.password.message}</Text>
        )}

        <Controller
          name="name"
          control={control}
          rules={{ required: "이름은 필수입니다." }}
          render={({ field }) => (
            <Input type="text" placeholder="Name" {...field} />
          )}
        />
        {errors.name && <Text color="red.500">{errors.name.message}</Text>}

        <Button type="submit" isLoading={signUpFetch.loading}>
          가입
        </Button>
      </form>
    </>
  );
};

export default SignUpModal;
