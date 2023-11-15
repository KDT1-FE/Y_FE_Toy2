import { Box, FormLabel, Input } from '@chakra-ui/react';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';

interface LoginInputBoxProps {
  register: UseFormRegisterReturn<'id' | 'password'>;
  placeholder: string;
  errors: FieldError | undefined;
}

const LoginInputBox = ({
  register,
  placeholder,
  errors,
}: LoginInputBoxProps) => {
  return (
    <Box>
      <FormLabel>Login</FormLabel>
      <Box display="flex" gap="4" justifyContent="center" alignItems="center">
        <Input placeholder={placeholder} size="lg" id="login" {...register} />
      </Box>
      {errors && <Box color="red.500">{errors.message}</Box>}
    </Box>
  );
};

export default LoginInputBox;
