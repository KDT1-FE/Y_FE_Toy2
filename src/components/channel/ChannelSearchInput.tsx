import { SearchIcon } from '@chakra-ui/icons';
import { Input, InputGroup, InputRightElement } from '@chakra-ui/react';
import { ChangeEvent } from 'react';
import { useRecoilState } from 'recoil';
import { categoryChannelState } from '../../recoil/channel.atom';

const ChannelSearchInput = () => {
  const [channel, setChannel] = useRecoilState(categoryChannelState);
  const searchChannel = (e: ChangeEvent<HTMLInputElement>) => {
    setChannel({ ...channel, title: e.target.value });
  };

  return (
    <InputGroup maxW={240}>
      <Input
        placeholder="채팅방 검색"
        value={channel.title}
        onChange={searchChannel}
      />
      <InputRightElement>
        <SearchIcon color="gray.300" />
      </InputRightElement>
    </InputGroup>
  );
};

export default ChannelSearchInput;
