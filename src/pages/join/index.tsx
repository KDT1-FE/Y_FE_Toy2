import { Box, Button } from '@chakra-ui/react';
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import JoinInputBox from '../../components/join/JoinInputBox';
import JoinIdInputBox from '../../components/join/JoinIdInputBox';
import JoinImageInputBox from '../../components/join/JoinImageInputBox';
import { REGISTER } from '../../constants/join';
import { JoinForm, JoinInfo } from '../../@types/join';
import { useJoin } from '../../hooks/join';
import { useNavigate } from 'react-router';

const Join = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<JoinForm>({ mode: 'onChange' });
  const [isChecking, setIsChecking] = useState<boolean | null>(null);
  const [image, setImage] = useState('');
  const mutation = useJoin();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<JoinForm> = (event) => {
    if (isChecking === null) {
      alert('중복 확인을 해주세요');
      return;
    }
    const joinInfo: JoinInfo = {
      name: event.name,
      id: event.id,
      password: event.password,
    };
    if (image) joinInfo.picture = image;
    mutation.mutate(joinInfo, {
      onSuccess: () => {
        alert('회원 가입에 성공했습니다!');
        navigate('/login');
      },
    });
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="95vh"
      flexDir="column"
    >
      <Box color="blue.400" mb="2" fontSize="50" fontWeight="bold">
        smartalk
      </Box>
      <Box color="blackAlpha.800" mb="5" fontSize="30" fontWeight="semibold">
        회원가입
      </Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box
          width="37.5rem"
          display="flex"
          flexDir="column"
          justifyContent="space-evenly"
          height="34rem"
        >
          <JoinImageInputBox image={image} setImage={setImage} />
          <JoinIdInputBox
            register={register('id', {
              required: REGISTER.REQUIRED_MESSAGE,
              pattern: {
                value: /^[A-Za-z0-9]+$/,
                message: REGISTER.ID_MESSAGE,
              },
              onChange: () => {
                if (isChecking !== null) {
                  setIsChecking(null);
                }
              },
            })}
            placeholder={REGISTER.ID_MESSAGE}
            errors={errors.id}
            isChecking={isChecking}
            watch={watch}
            setIsChecking={setIsChecking}
          />
          <JoinInputBox
            register={register('password', {
              required: REGISTER.REQUIRED_MESSAGE,
              minLength: {
                value: REGISTER.PASSWORD_MIN_LENGTH,
                message: REGISTER.PASSWORD_MESSAGE,
              },
            })}
            placeholder={REGISTER.PASSWORD_MESSAGE}
            InputId="password"
            errors={errors.password}
          />
          <JoinInputBox
            register={register('name', {
              required: REGISTER.REQUIRED_MESSAGE,
              maxLength: {
                value: REGISTER.NAME_MAX_LENGTH,
                message: REGISTER.NAME_MESSAGE,
              },
            })}
            placeholder={REGISTER.NAME_MESSAGE}
            InputId="name"
            errors={errors.name}
          />
          <Box display="flex" flexDir="column">
            <Button
              type="submit"
              bg="blue.400"
              color="white"
              _hover={{ bg: 'blue.500' }}
              mt="4"
              mb="2"
            >
              회원가입
            </Button>
            <Box color="blackAlpha.600" alignSelf="end">
              이미 회원이신가요?
              <Button
                color="blue.300"
                _hover={{ bg: 'white' }}
                bg="white"
                onClick={() => {
                  navigate('/login');
                }}
              >
                로그인 하러 가기
              </Button>
            </Box>
          </Box>
        </Box>
      </form>
    </Box>
  );
};

export default Join;
