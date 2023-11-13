import React, { useCallback, useRef, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Input,
  Button,
  Text,
  Alert,
  AlertIcon,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormErrorMessage,
  Box,
  Image,
} from "@chakra-ui/react";
import useFetch from "../../../hooks/useFetch";
import axios from "axios";
import styled from "styled-components";
import { FaImage } from "react-icons/fa";

interface FormData {
  id: string;
  password: string;
  name: string;
  picture?: string;
}
const DragDropBox = styled(Box)`
  border: 3px dashed #dbdbdb;
  position: relative;
  width: 40%;
  height: 140px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin-top: 40px;
  margin-bottom: 40px;
  margin-left: auto;
  margin-right: auto;
`;

interface SignUpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SignUpModal = ({ isOpen, onClose }: SignUpModalProps) => {
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
  const fileInputRef = useRef<HTMLInputElement>(null);

  // ID 중복 검사
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

  // 파일 선택 변경
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      setSelectedFile(file);
    }
  };

  // 드래그 앤 드롭
  const onDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      setSelectedFile(file);
    }
  }, []);

  const onDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  }, []);

  // 파일 입력 필드 트리거
  const triggerFileSelect = () => {
    fileInputRef.current?.click();
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
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton style={{ zIndex: 2 }} />
        <ModalBody
          display="flex"
          flexDirection="column"
          alignItems="center"
          sx={{
            ".chakra-input::placeholder": {
              textAlign: "center",
            },
          }}
        >
          {signUpStatus && (
            <Alert status={signUpStatus.type}>
              <AlertIcon />
              {signUpStatus.message}
            </Alert>
          )}
          {/* 회원가입 폼 */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <DragDropBox
              onDrop={onDrop}
              onDragOver={onDragOver}
              onClick={triggerFileSelect}
            >
              {selectedFile ? (
                <Image
                  src={URL.createObjectURL(selectedFile)}
                  alt="Upload Preview"
                  boxSize="40px"
                />
              ) : (
                <FaImage size="40px" />
              )}
              <Text>이미지 업로드</Text>
              <Input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                ref={fileInputRef}
                display="none"
              />
            </DragDropBox>
            {/* 아이디 입력 */}
            <FormControl isInvalid={!!errors.id} my={4} justifyContent="center">
              <Controller
                name="id"
                control={control}
                rules={{
                  required: "ID is required.",
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
                  <Input
                    type="text"
                    placeholder="아이디 입력"
                    {...field}
                    width="300px"
                    m="auto"
                  />
                )}
              />
              <FormErrorMessage>
                {errors.id && errors.id.message}
              </FormErrorMessage>
            </FormControl>
            {/* 비밀번호 입력 */}
            <FormControl isInvalid={!!errors.password} my={4}>
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
                  <Input
                    type="password"
                    placeholder="비밀번호 입력"
                    {...field}
                  />
                )}
              />
              <FormErrorMessage>
                {errors.password && errors.password.message}
              </FormErrorMessage>
            </FormControl>
            {/* 닉네임 입력 */}
            <FormControl isInvalid={!!errors.name} my={4}>
              <Controller
                name="name"
                control={control}
                rules={{ required: "이름은 필수입니다." }}
                render={({ field }) => (
                  <Input type="text" placeholder="닉네임" {...field} />
                )}
              />
              <FormErrorMessage>
                {errors.name && errors.name.message}
              </FormErrorMessage>
            </FormControl>
            <Button
              type="submit"
              isLoading={signUpFetch.loading}
              width="300px"
              m="auto"
              my={14}
            >
              회원가입
            </Button>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default SignUpModal;
