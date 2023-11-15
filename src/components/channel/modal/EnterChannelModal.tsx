import {
  Avatar,
  AvatarGroup,
  Badge,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import { Channel } from '../../../@types/channel';
import { Link } from 'react-router-dom';
import { splitChannelName } from '../../../utils';
import { CATEGORY_COLOR_SCHEMES } from '../../../constants/channel';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  selectedChannel: Channel;
}

const EnterChannelModal = ({ isOpen, onClose, selectedChannel }: Props) => {
  const { title, category } = splitChannelName(selectedChannel.name);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {title}
          <Badge colorScheme={CATEGORY_COLOR_SCHEMES[`${category}`]} ml={2}>
            {category}
          </Badge>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <AvatarGroup size="sm" max={3}>
            {selectedChannel.users.map((user) => (
              <Avatar key={user.id} name={user.name} src={user.picture} />
            ))}
          </AvatarGroup>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue">
            <Link to={`/chats/${selectedChannel?.id}`}>참여하기</Link>
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EnterChannelModal;
