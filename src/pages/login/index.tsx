import { Box, Button } from '@chakra-ui/react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import LoginInputBox from '../../components/login/loginInputBox';
import { LOGIN } from '../../constants/login';
import { login } from '../../api/login';
import { LoginForm, LoginResToken } from '../../@types/login';

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({ mode: 'onChange' });

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<LoginForm> = async (data) => {
    try {
      const result: LoginResToken = await login(data);

      if (result.accessToken && result.refreshToken) {
        alert('로그인에 성공하셨습니다');

        navigate('/');
      } else {
        window.alert(
          '로그인에 실패하셨습니다. 정확하게 입력되었는 지 확인해주세요.',
        );
      }
    } catch (error) {
      window.alert('로그인에 실패했습니다. 다시 시도해주세요.');
    }
  };

  const goToJoinPage = () => {
    navigate('/join');
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
          height="20rem"
        >
          <LoginInputBox
            register={register('id', {
              required: LOGIN.REQUIRED_ID,
            })}
            placeholder={LOGIN.REQUIRED_ID}
            errors={errors.id}
          />
          <LoginInputBox
            register={register('password', {
              required: LOGIN.REQUIRED_PW,
            })}
            placeholder={LOGIN.REQUIRED_PW}
            errors={errors.password}
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
              로그인
            </Button>
            <Box color="blackAlpha.600" alignSelf="end">
              계정이 없으신가요?
              <Button
                color="blue.300"
                _hover={{ bg: 'white' }}
                bg="white"
                onClick={goToJoinPage}
              >
                회원가입
              </Button>
            </Box>
          </Box>
        </Box>
      </form>
    </Box>
  );
};

export default Login;
