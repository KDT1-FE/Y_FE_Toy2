import { Avatar, Box, Button, FormLabel, Input } from '@chakra-ui/react';

interface JoinImageInputBoxProps {
  image: string;
  setImage: React.Dispatch<React.SetStateAction<string>>;
}
const JoinImageInputBox = ({ image, setImage }: JoinImageInputBoxProps) => {
  const maxSize = 1024 * 1024;

  const imageFileToBase64 = (file: File) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      const result = fileReader.result;
      if (typeof result === 'string') setImage(result);
    };
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (
      event.currentTarget.files &&
      event.currentTarget instanceof HTMLInputElement
    ) {
      const file = event.currentTarget.files[0];
      if (!file) return;
      if (maxSize < file.size) {
        alert('이미지 용량은 1MB를 넘을 수 없습니다');
        return;
      }
      imageFileToBase64(file);
    }
  };

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
          id="file"
          onChange={handleImageChange}
          display="none"
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
