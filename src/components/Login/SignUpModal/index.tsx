import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Input, Button, Text } from "@chakra-ui/react";
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
    formState: { errors },
  } = useForm<FormData>();
  const signUpFetch = useFetch({
    url: "https://fastcampus-chat.net/signup",
    method: "POST",
    data: {},
    start: false,
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const checkIdDuplication = async (id: string): Promise<boolean> => {
    try {
      const response = await axios.post(
        "https://fastcampus-chat.net/check/id",
        { id },
      );
      // 서버가 ID가 중복되었다고 응답하면 true를 반환
      return response.data.isDuplicated;
    } catch (error) {
      console.error("Error checking ID duplication", error);
      // 에러 발생 시 안전하게 중복으로 간주할 수 있습니다.
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
        // 성공 처리 로직 구현 예정
      }
    } catch (error) {
      console.error("회원가입 실패:", error);
      // 실패 처리 로직 구현 예정
    }
  };

  return (
    <>
      <div>회원가입</div>
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
              const isDuplicated = await checkIdDuplication(id);
              console.log("ID 중복 확인 결과:", isDuplicated);
              if (isDuplicated) {
                return "이미 사용중인 ID입니다.";
              }
              return true;
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
