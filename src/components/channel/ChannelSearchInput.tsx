import { SearchIcon } from '@chakra-ui/icons';
import { Input, InputGroup, InputRightElement } from '@chakra-ui/react';
import { ChangeEvent } from 'react';

interface Props {
  title: string;
  setTitle: (title: string) => void;
}

const ChannelSearchInput = ({ title, setTitle }: Props) => {
  const searchChannel = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(title);
    setTitle(e.target.value);
  };

  return (
    <InputGroup maxW={240}>
      <Input placeholder="채팅방 검색" value={title} onChange={searchChannel} />
      <InputRightElement>
        <SearchIcon color="gray.300" />
      </InputRightElement>
    </InputGroup>
  );
};

export default ChannelSearchInput;
