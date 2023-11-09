import { Button } from '@chakra-ui/button';
import { Input, InputGroup, InputRightElement } from '@chakra-ui/input';

const ChatInput = () => {
  return (
    <InputGroup size="lg" zIndex="1" maxWidth={700} m="0 auto">
      <Input
        pr="4.5rem"
        overflowY="scroll"
        type="text"
        placeholder="Message to Channel"
        fontSize="md"
        bg="gray.300"
        color="blackAlpha.900"
        focusBorderColor="white"
        _focus={{
          bg: 'gray.300',
        }}
      />
      <InputRightElement width="4.5rem">
        <Button h="1.75rem" size="sm">
          Go
        </Button>
      </InputRightElement>
    </InputGroup>
  );
};

export default ChatInput;
