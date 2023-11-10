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
} from '@chakra-ui/react';
import { ValidationInput, FormData } from '../../interfaces/interface';

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
          error = '닉네임은 알파벳과 완성된 한글 음절로만 구성되어야 합니다';
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
      const res = await postJoin(formData);
      console.log(res);
      alert('회원가입에 성공했습니다.');
      navigate('/');
    } catch (e: any) {
      if (e.message === 'Request failed with status code 401') {
        alert('중복된 아이디가 있습니다.');
      } else {
        alert('회원가입에 실패했습니다');
      }
    }
  };

  const isFormValid = () => {
    return Object.values(errors).every((error) => error === '');
  };

  return (
    <Flex
      justifyContent={'center'}
      alignItems={'center'}
      flexDirection={'column'}
      backgroundColor="#f8fafc"
      height={'100vh'}>
      <label
        htmlFor="fileInput"
        style={{ cursor: 'pointer', position: 'relative' }}>
        <Img
          src="/assets/inputImg.svg"
          position="relative"
          bottom={-170}
          alt="inputImg"
        />
        <Input
          id="fileInput"
          type="file"
          style={{ position: 'absolute', width: 0, height: 0, opacity: 0 }}
          onChange={(e) => console.log(e.target.files)} // 바꿔줘야함
        />
      </label>

      <Center
        margin={100}
        backgroundColor={'white'}
        borderRadius={10}
        boxShadow="lg"
        flexDirection={'column'}
        width={450}
        minHeight={730}
        justifyContent={'flex-end'}>
        <form onSubmit={handleJoinSubmit}>
          <FormControl
            isRequired
            isInvalid={isError.id}
            marginBottom={5}
            marginLeft={7}
            width={250}>
            <FormLabel>아이디</FormLabel>
            <Input
              placeholder="알파벳만 가능합니다"
              _placeholder={{ fontSize: 'sm' }}
              borderColor="gray.400"
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
            marginBottom={5}
            marginLeft={7}
            width={250}>
            <FormLabel>닉네임</FormLabel>
            <Input
              placeholder="2자이상 20자 이하로 입력해주세요"
              _placeholder={{ fontSize: 'sm' }}
              borderColor="gray.400"
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
            marginBottom={5}
            marginLeft={7}
            width={250}>
            <FormLabel>비밀번호</FormLabel>
            <Input
              placeholder="5자 이상 입력해주세요"
              _placeholder={{ fontSize: 'sm' }}
              borderColor="gray.400"
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
            marginBottom={10}
            marginLeft={7}
            width={250}>
            <FormLabel>비밀번호 확인</FormLabel>
            <Input
              placeholder="5자 이상 입력해주세요"
              _placeholder={{ fontSize: 'sm' }}
              borderColor="gray.400"
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
            bg="#4FD1C5"
            color="white"
            _disabled={{
              bg: '#9AEBE0',
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
            fontWeight={700}>
            로그인
          </Link>
        </Flex>
      </Center>
    </Flex>
  );
};

export default UserJoin;
