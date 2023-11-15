import { Avatar, Box, Button, FormLabel, Input } from '@chakra-ui/react';

interface JoinImageInputBoxProps {
  image: string;
  setImage: React.Dispatch<React.SetStateAction<string>>;
  // eslint-disable-next-line no-unused-vars
  handleImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
const JoinImageInputBox = ({
  image,
  setImage,
  handleImageChange,
}: JoinImageInputBoxProps) => {
  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <FormLabel
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        width="6.875rem"
        height="6.875rem"
      >
        <Avatar
          src={image}
          width="6.25rem"
          height="6.25rem"
          cursor="pointer"
          bg="gray.400"
        />

        <Input
          type="file"
          display="none"
          id="file"
          onChange={handleImageChange}
        />
      </FormLabel>
      {image !== '' && (
        <Button
          color="blackAlpha.700"
          _hover={{ textDecoration: 'underline' }}
          cursor="pointer"
          onClick={() => {
            setImage('');
          }}
          _focus={{ bg: 'none' }}
          bg="white"
        >
          제거
        </Button>
      )}
    </Box>
  );
};

export default JoinImageInputBox;
