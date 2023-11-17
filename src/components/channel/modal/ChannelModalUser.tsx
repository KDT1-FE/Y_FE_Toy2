import { User } from '../../../@types/user';
import { Box, Image, Text } from '@chakra-ui/react';

interface Props {
  user: User;
  addUser: (id: string) => void;
  isIncluded: (id: string) => boolean;
}

const ChannelModalUser = ({ user, addUser, isIncluded }: Props) => {
  return (
    <Box
      key={user.id}
      onClick={() => addUser(user.id)}
      display="flex"
      alignItems="center"
      gap="2"
      p="2"
      border={isIncluded(user.id) ? '2px solid #3182ce' : '2px solid #fff'}
      opacity={isIncluded(user.id) ? 1 : 0.5}
      bgColor={'gray.100'}
      borderRadius="md"
      cursor="pointer"
      transition={'all .15s ease-in-out'}
      _hover={{ opacity: 1 }}
    >
      <Image
        src={user.picture}
        alt={user.name}
        boxSize="40px"
        borderRadius="full"
      />
      <Text textAlign="center">{user.name}</Text>
    </Box>
  );
};

export default ChannelModalUser;
