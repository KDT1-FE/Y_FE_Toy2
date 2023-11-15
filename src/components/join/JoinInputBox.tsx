import { Box, FormLabel, Input } from '@chakra-ui/react';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';
interface JoinInputBoxProps {
  InputId: string;
  register: UseFormRegisterReturn<'password' | 'name'>;
  placeholder: string;
  errors: FieldError | undefined;
}

const JoinInputBox = ({
  register,
  placeholder,
  InputId,
  errors,
}: JoinInputBoxProps) => {
  return (
    <Box>
      <FormLabel>{InputId.toUpperCase()}</FormLabel>
      <Input placeholder={placeholder} size="lg" id={InputId} {...register} />
      {errors && <Box color="red.500">{errors.message}</Box>}
    </Box>
  );
};

export default JoinInputBox;
