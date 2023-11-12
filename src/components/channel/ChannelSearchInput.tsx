import { SearchIcon } from '@chakra-ui/icons';
import { Input, InputGroup, InputRightElement } from '@chakra-ui/react';

const ChannelSearchInput = () => {
  return (
    <InputGroup maxW={240}>
      <Input placeholder="채팅방 검색" />;
      <InputRightElement>
        <SearchIcon color="gray.300" />
      </InputRightElement>
    </InputGroup>
  );
};

export default ChannelSearchInput;
