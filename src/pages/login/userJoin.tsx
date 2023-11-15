import React, { useState, useEffect } from 'react';
import { postJoin } from '../../api/index';
import { Link as ReactRouterLink, useNavigate } from 'react-router-dom';
import {
  Center,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Button,
  Input,
  Flex,
  Img,
  Link,
  Box,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Fade,
} from '@chakra-ui/react';
import { ValidationInput, FormData } from '../../interfaces/interface';
import swal from 'sweetalert';

const UserJoin = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    id: '',
    password: '',
    confirmPassword: '',
    name: '',
    picture: '',
  });

  const [isError, setIsError] = useState({
    id: false,
    password: false,
    confirmPassword: false,
    name: false,
    picture: false,
  });

  const [errors, setErrors] = useState({
    id: '',
    password: '',
    confirmPassword: '',
    name: '',
    picture: '',
  });

  const [filePreviewUrl, setFilePreviewUrl] = useState('');

  const [showAlert, setShowAlert] = useState({
    active: false,
    message: '',
    type: '',
  });

  useEffect(() => {
    if (showAlert.active) {
      const timer = setTimeout(() => {
        setShowAlert({ active: false, message: '', type: '' });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showAlert.active]);

  const [isHovering, setIsHovering] = useState(false);

  const validateField = ({
    fieldName,
    value,
    formData,
  }: ValidationInput): string => {
    let error = '';
    switch (fieldName) {
      case 'id':
        if (value.trim() === '') error = '아이디을 입력해주세요';
        else if (!/^[a-zA-Z]+$/.test(value))
          error = '아이디는 알파벳만 포함할 수 있습니다.';

        break;
      case 'password':
        if (value.trim() === '') error = '비밀번호를 입력해주세요';
        else if (value.length < 5)
          error = '비밀번호는 최소 5자 이상이어야 합니다';
        break;
      case 'confirmPassword':
        if (value.trim() === '') error = '비밀번호를 한번 더 입력해주세요';
        else if (value !== formData.password)
          error = '비밀번호가 일치하지 않습니다';
        break;
      case 'name':
        if (value.trim() === '') error = '닉네임을 입력해주세요';
        else if (value.length < 2 || value.length > 20)
          error = '닉네임은 2자에서 20자 사이어야 합니다';
        else if (!/^[a-zA-Z가-힣]+$/.test(value))
          error = '닉네임은 영문과 한글로만 구성되어야 합니다';
        break;
      default:
        break;
    }
    return error;
  };

  const fieldNames: Array<keyof FormData> = [
    'id',
    'password',
    'confirmPassword',
    'name',
  ];

  useEffect(() => {
    const newErrors: { [key in keyof FormData]?: string } = {};
    const newIsError: { [key in keyof FormData]?: boolean } = {};

    fieldNames.forEach((fieldName) => {
      const value: string = formData[fieldName];
      const error = validateField({ fieldName, value, formData });

      newErrors[fieldName] = error;
      newIsError[fieldName] = !!error;
    });

    setErrors((prevErrors) => ({ ...prevErrors, ...newErrors }));
    setIsError((prevIsError) => ({ ...prevIsError, ...newIsError }));
  }, [formData]);

  const handleJoinSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // 닉네임중복 핸들링 로직 필요
      await postJoin(formData);
      swal({ title: '회원가입에 성공했습니다.', icon: 'success' });
      navigate('/');
    } catch (e: any) {
      let errorMessage = '';
      let errorType = '';
      if (e.message === 'Request failed with status code 401') {
        errorMessage = '이미 가입된 아이디입니다.';
        errorType = 'id';
      } else if (e.message === 'Network Error') {
        errorMessage = `이미지 파일명이 너무 깁니다.`;
        errorType = 'picture';
      } else if (e.message === 'Request failed with status code 415') {
        errorMessage = `이미지 용량이 너무 큽니다.`;
        errorType = 'picture';
      } else {
        console.log(e);
        errorMessage = `회원가입에 실패했습니다. 오류코드: ${e.message}`;
        errorType = 'general';
      }
      setShowAlert({ active: true, message: errorMessage, type: errorType });
    }
  };

  const isFormValid = () => {
    return Object.values(errors).every((error) => error === '');
  };

  const handleImgUploader = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        const result = reader.result;
        if (typeof result === 'string') {
          setFilePreviewUrl(result);
          setFormData({ ...formData, picture: result });
        }
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <Flex
      justifyContent={'flex-end'}
      alignItems={'center'}
      flexDirection={'column'}
      height={850}>
      <Center
        backgroundColor={'white'}
        borderRadius={10}
        boxShadow="lg"
        flexDirection={'column'}
        height={650}
        width={450}
        justifyContent={'flex-end'}>
        <form onSubmit={handleJoinSubmit}>
          <label
            htmlFor="picture"
            style={{ cursor: 'pointer', position: 'relative', bottom: 5 }}>
            <Box
              width={150}
              height={150}
              backgroundColor={'#f8fafc'}
              borderRadius={10}
              overflow="hidden"
              margin={'auto'}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}>
              <Img
                src={filePreviewUrl || '/assets/inputImg.svg'}
                alt="File preview"
                width="100%"
                height="100%"
                borderRadius={10}
                objectFit="cover"
                style={
                  filePreviewUrl
                    ? {
                        border: '2px solid #E2E8F0',
                      }
                    : {}
                }
              />
              {isHovering && filePreviewUrl && (
                <Box
                  position="absolute"
                  transform="translate(0%, -100%)"
                  width={150}
                  height={150}
                  backgroundColor="rgba(0, 0, 0, 0.5)"
                  borderRadius={10}
                  display="flex"
                  justifyContent="center"
                  alignItems="center">
                  <Img
                    src="public/assets/trashBin.svg"
                    alt="Delete"
                    width="24px"
                    height="24px"
                  />
                </Box>
              )}
            </Box>
            <Input
              id="picture"
              accept="image/*"
              type="file"
              style={{ position: 'absolute', width: 0, height: 0, opacity: 0 }}
              onChange={handleImgUploader}
            />
          </label>

          <FormControl
            isRequired
            isInvalid={isError.id}
            marginTop={3}
            marginBottom={3}
            marginLeft={7}
            width={250}
            height={90}>
            <FormLabel>아이디</FormLabel>
            <Input
              placeholder="알파벳만 가능합니다"
              _placeholder={{ fontSize: 'sm' }}
              borderColor={
                showAlert.active && showAlert.type === 'id'
                  ? 'red.500'
                  : 'gray.200'
              }
              type="text"
              autoComplete="off"
              value={formData.id}
              onChange={(e) => setFormData({ ...formData, id: e.target.value })}
            />
            <FormErrorMessage textAlign={'left'}>{errors.id}</FormErrorMessage>
          </FormControl>

          <FormControl
            isRequired
            isInvalid={isError.name}
            marginBottom={3}
            marginLeft={7}
            width={250}
            height={90}>
            <FormLabel>닉네임</FormLabel>
            <Input
              placeholder="2자이상 20자 이하로 입력해주세요"
              _placeholder={{ fontSize: 'sm' }}
              borderColor={
                showAlert.active && showAlert.type === 'name'
                  ? 'red.500'
                  : 'gray.200'
              }
              type="text"
              autoComplete="off"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
            <FormErrorMessage textAlign={'left'}>
              {errors.name}
            </FormErrorMessage>
          </FormControl>

          <FormControl
            isRequired
            isInvalid={isError.password}
            marginBottom={3}
            marginLeft={7}
            width={250}
            height={90}>
            <FormLabel>비밀번호</FormLabel>
            <Input
              placeholder="5자 이상 입력해주세요"
              _placeholder={{ fontSize: 'sm' }}
              borderColor={
                showAlert.active && showAlert.type === 'password'
                  ? 'red.500'
                  : 'gray.200'
              }
              type="password"
              autoComplete="new-password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
            <FormErrorMessage textAlign={'left'}>
              {errors.password}
            </FormErrorMessage>
          </FormControl>
          <FormControl
            isRequired
            isInvalid={isError.confirmPassword}
            marginBottom={5}
            marginLeft={7}
            width={250}
            height={90}>
            <FormLabel>비밀번호 확인</FormLabel>
            <Input
              placeholder="5자 이상 입력해주세요"
              _placeholder={{ fontSize: 'sm' }}
              borderColor={
                showAlert.active && showAlert.type === 'confirmPassword'
                  ? 'red.500'
                  : 'gray.200'
              }
              type="password"
              autoComplete="new-password"
              value={formData.confirmPassword}
              onChange={(e) =>
                setFormData({ ...formData, confirmPassword: e.target.value })
              }
            />
            <FormErrorMessage textAlign={'left'}>
              {errors.confirmPassword}
            </FormErrorMessage>
          </FormControl>
          <Button
            width={300}
            type="submit"
            size="lg"
            isDisabled={!isFormValid()}
            color="white"
            bg={'#4FD1C5'}
            _hover={{
              bg: '#9AEBE0',
            }}
            _disabled={{
              bg: '#CBD5E0',
            }}>
            가입하기
          </Button>
        </form>
        <Flex justifyContent={'center'} gap="10px" padding="10">
          이미 가입하셨나요?
          <Link
            as={ReactRouterLink}
            to="/"
            marginRight={2}
            color="#4FD1C5"
            fontWeight={600}>
            로그인
          </Link>
        </Flex>
      </Center>
      <Fade in={showAlert.active}>
        <Alert
          marginTop={5}
          marginBottom={3}
          status="error"
          width={400}
          height={70}
          bg={'red.500'}
          color={'white'}
          borderRadius={10}>
          <AlertIcon color={'white'} />
          <Box>
            <AlertTitle mr={2}>회원가입 오류</AlertTitle>
            <AlertDescription>{showAlert.message}</AlertDescription>
          </Box>
        </Alert>
      </Fade>
    </Flex>
  );
};

export default UserJoin;
