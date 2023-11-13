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
import useFireFetch from "../../../hooks/useFireFetch";
import { arrayUnion } from "firebase/firestore";

interface GameData {
  id: string;
  users: string[];
}

interface VoteProps {
  onClose: (selectedUser: string) => void;
  gameData: GameData;
}

const Vote: React.FC<VoteProps> = ({
  onClose,
  gameData,
}): React.ReactElement => {
  const [selectedUser, setSelectedUser] = useState<string>("");
  const fireFetch = useFireFetch();

  const storedToken = localStorage.getItem("token");
  const tokenData = storedToken ? JSON.parse(storedToken) : null;

  const handleUserChange = (value: string) => {
    setSelectedUser(value);
  };

  const handleVoteSubmit = () => {
    if (selectedUser !== null) {
      const myId = tokenData.id;
      fireFetch.updateData("game", gameData.id, {
        votedFor: arrayUnion({ by: myId, liar: selectedUser }),
      });
      console.log(selectedUser + "에 투표했습니다.");
      onClose(selectedUser);
    }
  };

  return (
    <>
      <Modal isOpen={true} onClose={() => onClose(selectedUser)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>라이어 투표하기</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <RadioGroup value={selectedUser} onChange={handleUserChange}>
              <Stack spacing={2}>
                {gameData.users.map((user) => (
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
    </>
  );
};

export default Vote;
