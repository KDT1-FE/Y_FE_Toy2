// Vote 컴포넌트 재정의
import { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Radio,
  RadioGroup,
  Stack,
} from "@chakra-ui/react";

interface VoteProps {
  onClose: () => void;
  gameData: string[];
}

const Vote: React.FC<VoteProps> = ({ onClose, gameData }) => {
  const [selectedUser, setSelectedUser] = useState<string>("");
  console.log("Vote/ gameData:", gameData);
  const handleUserChange = (value: string) => {
    setSelectedUser(value);
  };

  const handleVoteSubmit = () => {
    //투표 로직
    console.log("Selected User:", selectedUser);
    onClose();
  };

  return (
    <Modal isOpen={true} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>라이어 투표하기</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <RadioGroup value={selectedUser} onChange={handleUserChange}>
            <Stack spacing={2}>
              {gameData.map((user) => (
                <Radio key={user} value={user}>
                  {user}
                </Radio>
              ))}
            </Stack>
          </RadioGroup>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleVoteSubmit}>
            투표 완료
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default Vote;
