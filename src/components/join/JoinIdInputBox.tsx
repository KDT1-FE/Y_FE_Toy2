import { Box, Button, FormLabel, Input } from '@chakra-ui/react';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';

interface JoinIdInputBoxProps {
  register: UseFormRegisterReturn<'id'>;
  placeholder: string;
  errors: FieldError | undefined;
  isChecking: boolean | null;
  handleCheckId: () => void;
}
const JoinIdInputBox = ({
  register,
  placeholder,
  errors,
  isChecking,
  handleCheckId,
}: JoinIdInputBoxProps) => {
  return (
    <Box>
      <FormLabel>ID</FormLabel>
      <Box display="flex" gap="4" justifyContent="center" alignItems="center">
        <Input placeholder={placeholder} size="lg" id="id" {...register} />
        <Button
          isDisabled={isChecking ? true : errors ? true : false}
          onClick={handleCheckId}
        >
          중복 확인
        </Button>
      </Box>
      {errors && <Box color="red.500">{errors.message}</Box>}
      {isChecking && <Box color="green">가능한 아이디입니다</Box>}
      {isChecking === false && <Box color="red.500">중복 아이디입니다</Box>}
    </Box>
  );
};

export default JoinIdInputBox;
