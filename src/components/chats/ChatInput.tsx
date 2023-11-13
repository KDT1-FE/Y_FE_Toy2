import { Button } from '@chakra-ui/button';
import { Input, InputGroup, InputRightElement } from '@chakra-ui/input';
import socket from '../../api/socket';
import { useState } from 'react';
import { SOCKET } from '../../constants/socket';

const ChatInput = () => {
  const [value, setValue] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const sendChat = () => {
    if (value === '') return;
    socket.emit(SOCKET.MESSAGE_TO_SERVER, value);
    setValue('');
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      sendChat();
    }
  };

  return (
    <InputGroup size="lg" zIndex="1" maxWidth={700} m="0 auto">
      <Input
        pr="4.5rem"
        overflowY="scroll"
        value={value}
        type="text"
        placeholder="Message to Channel"
        fontSize="md"
        bg="gray.300"
        color="blackAlpha.900"
        focusBorderColor="white"
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        _focus={{
          bg: 'gray.300',
        }}
      />
      <InputRightElement width="4.5rem">
        <Button
          h="1.75rem"
          size="sm"
          onClick={sendChat}
          disabled={value === ''}
          color={value === '' ? 'blackAlpha.300' : 'blackAlpha.900'}
          _hover={{
            bg: value === '' ? '' : 'gray.200',
          }}
        >
          Go
        </Button>
      </InputRightElement>
    </InputGroup>
  );
};

export default ChatInput;
