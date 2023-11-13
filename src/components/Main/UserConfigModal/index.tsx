import React, { useCallback, useRef, useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Input,
  Button,
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
  Text,
} from "@chakra-ui/react";
import { useRecoilValue } from "recoil";
import { authState } from "../../../recoil/atoms/authState";
import axios from "axios";
import styled from "styled-components";
import { FaImage } from "react-icons/fa";
import useFetch from "../../../hooks/useFetch";

const MAX_IMAGE_SIZE = 1024 * 1024; // 1MB

interface FormData {
  id: string;
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

interface UserConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const UserConfigModal = ({ isOpen, onClose }: UserConfigModalProps) => {
  const auth = useRecoilValue(authState);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [profile, setProfile] = useState<FormData>({
    id: "",
    name: "",
    picture: "",
  });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [updateStatus, setUpdateStatus] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const {
    control,
    handleSubmit,
    setValue,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<FormData>();

  // 사용자 정보를 가져오기.
  const { result: userInfo, refresh: refreshUserInfo } = useFetch({
    url: "https://fastcampus-chat.net/auth/me", // 사용자 정보를 가져오는 URL
    method: "GET",
    start: isOpen, // 모달이 열릴 때 요청 시작
  });

  useEffect(() => {
    if (userInfo && userInfo.auth) {
      console.log("UserInfo:", userInfo); // 로깅 추가
      setValue("id", userInfo.user.id);
      setValue("name", userInfo.user.name);
      setValue("picture", userInfo.user.picture);
      setProfile({
        ...profile,
        id: userInfo.user.id,
        name: userInfo.user.name,
        picture: userInfo.user.picture,
      });
    }
  }, [userInfo, setValue, setProfile, isOpen]);

  // ID 중복 검사
  const checkIdDuplication = async (id: string): Promise<boolean> => {
    try {
      const response = await axios.post("https://fastcampus-chat.net/auth/me", {
        id,
      });
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
      if (file.size > MAX_IMAGE_SIZE) {
        // 파일 크기 초과 에러 처리
        alert("이미지는 1MB 이하이어야 합니다.");
        return;
      }
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

  // 사용자 정보 업데이트
  const updateUserInfo = useFetch({
    url: "https://fastcampus-chat.net/user",
    method: "PATCH",
    data: {},
    start: false,
  });

  // 프로필 수정 제출
  const onSubmit = async (formData: FormData) => {
    const toBase64 = (file: File) =>
      new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
      });

    const updatedData = {
      name: formData.name,
      picture: selectedFile ? await toBase64(selectedFile) : profile.picture,
    };

    try {
      updateUserInfo.refresh({ data: updatedData }); // 데이터 업데이트 요청

      // 결과 확인
      if (updateUserInfo.statusCode === 200) {
        setUpdateStatus({
          type: "success",
          message: "프로필이 업데이트 되었습니다.",
        });
      }
    } catch (error) {
      setUpdateStatus({
        type: "error",
        message: "프로필 업데이트에 실패했습니다.",
      });
      console.error("프로필 업데이트 실패:", error);
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
          {updateStatus && (
            <Alert status={updateStatus.type}>
              <AlertIcon />
              {updateStatus.message}
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
              ) : profile.picture ? (
                <Image
                  src={profile.picture}
                  alt="Profile Picture"
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
              // isLoading={isUpdating}
              width="300px"
              m="auto"
              my={14}
            >
              설정완료
            </Button>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default UserConfigModal;
