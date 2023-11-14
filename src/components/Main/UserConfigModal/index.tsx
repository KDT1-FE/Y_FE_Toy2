import {
  Alert,
  AlertIcon,
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Spinner,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { FaImage } from "react-icons/fa";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import useFetch from "../../../hooks/useFetch";
import { authState } from "../../../recoil/atoms/authState";

interface FormData {
  id: string;
  name: string;
  picture?: string;
}

const MAX_IMAGE_SIZE = 1024 * 1024; // 1MB
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

// 프로필 설정 모달
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

  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>();

  // 사용자 정보 가져오기.
  const { result: userInfo } = useFetch({
    url: "https://fastcampus-chat.net/auth/me",
    method: "GET",
    start: isOpen, // 모달이 열릴 때 요청 시작
  });

  // 사용자 정보를 폼에 설정
  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
    }
    if (userInfo && userInfo.auth) {
      console.log("UserInfo:", userInfo);
      // 폼 값 설정 로직
      setValue("id", userInfo.user.id);
      setValue("name", userInfo.user.name);
      setValue("picture", userInfo.user.picture);
      setProfile({
        id: userInfo.user.id,
        name: userInfo.user.name,
        picture: userInfo.user.picture,
      });
      setIsLoading(false);
    }
  }, [isOpen, userInfo, setValue, setProfile]);

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
      // axios 요청 및 응답 처리
      const response = await axios.patch(
        "https://fastcampus-chat.net/user",
        updatedData,
        {
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${auth.accessToken}`,
          },
        },
      );
      if (response.status === 200) {
        setUpdateStatus({
          type: "success",
          message: "프로필이 업데이트 되었습니다.",
        });
      } else {
        setUpdateStatus({
          type: "error",
          message: "프로필 업데이트에 실패했습니다. ",
        });
      }
    } catch (error) {
      setUpdateStatus({
        type: "error",
        message: "프로필 업데이트에 실패했습니다.",
      });
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
          {isLoading ? (
            // 로딩 중 스피너 표시
            <Spinner size="xl" />
          ) : (
            // 로딩이 완료되면 폼 내용 표시
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
              <FormControl
                isInvalid={!!errors.id}
                my={4}
                justifyContent="center"
              >
                <Input
                  type="text"
                  placeholder="아이디"
                  value={profile.id}
                  readOnly
                  sx={{
                    cursor: "not-allowed", // 마우스 커서 변경 방지
                    _focus: { borderColor: "initial", boxShadow: "none" },
                    _hover: { borderColor: "initial" },
                  }}
                  width="300px"
                  m="auto"
                />
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
              <Button type="submit" width="300px" m="auto" my={14}>
                설정완료
              </Button>
            </form>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default UserConfigModal;
