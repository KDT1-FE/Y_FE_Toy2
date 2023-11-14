import { Box, Button } from '@chakra-ui/react';
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import JoinInputBox from '../../components/join/JoinInputBox';
import JoinIdInputBox from '../../components/join/JoinIdInputBox';
import JoinImageInputBox from '../../components/join/JoinImageInputBox';
import { REGISTER } from '../../constants/join';

export interface JoinForm {
  password: string;
  name: string;
  id: string;
}

const Join = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<JoinForm>({ mode: 'onChange' });
  const [isChecking, setIsChecking] = useState<boolean | null>(null);
  const [image, setImage] = useState('');

  const handleCheckId = () => {
    const id = watch('id');
    if (id === '') return;
    setIsChecking(false);
  };
  const onSubmit: SubmitHandler<JoinForm> = () => {
    // onSubmit
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (
      event.currentTarget.files &&
      event.currentTarget instanceof HTMLInputElement
    ) {
      const selectedFile = event.currentTarget.files[0];
      const fileUrl = URL.createObjectURL(selectedFile);
      setImage(fileUrl);
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="95vh"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box
          width="37.5rem"
          display="flex"
          flexDir="column"
          justifyContent="space-evenly"
          height="34rem"
        >
          <JoinImageInputBox
            image={image}
            setImage={setImage}
            handleImageChange={handleImageChange}
          />
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
            handleCheckId={handleCheckId}
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
              <Button color="blue.300" _hover={{ bg: 'white' }} bg="white">
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
