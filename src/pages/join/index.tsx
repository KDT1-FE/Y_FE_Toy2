import { Box, Button } from '@chakra-ui/react';
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import JoinInputBox from '../../components/join/JoinInputBox';
import JoinIdInputBox from '../../components/join/JoinIdInputBox';
import JoinImageInputBox from '../../components/join/JoinImageInputBox';

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
    console.log('first');
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
              required: '필수 입력입니다',
              pattern: {
                value: /^[A-Za-z0-9]+$/,
                message: '영어로만 입력해주세요',
              },
              onChange: () => {
                if (isChecking !== null) {
                  setIsChecking(null);
                }
              },
            })}
            placeholder="영어로만 입력해주세요"
            errors={errors.id}
            isChecking={isChecking}
            handleCheckId={handleCheckId}
          />
          <JoinInputBox
            register={register('password', {
              required: '필수 입력입니다',
              minLength: { value: 5, message: '5자 이상 입력해주세요' },
            })}
            placeholder="5자 이상 입력해주세요"
            InputId="password"
            errors={errors.password}
          />
          <JoinInputBox
            register={register('name', {
              required: '필수 입력입니다',
              maxLength: { value: 20, message: '20자 이하로 입력해주세요' },
            })}
            placeholder="20자 이하로 입력해주세요"
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
