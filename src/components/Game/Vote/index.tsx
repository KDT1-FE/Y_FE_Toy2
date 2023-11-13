import { useEffect, useState } from "react";
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
import CalculateVote from "./CalculateVote";
import useFireFetch from "../../../hooks/useFireFetch";
import { arrayUnion, serverTimestamp } from "firebase/firestore";

interface VoteProps {
  onClose: (selectedUser: string) => void;
  gameData: [];
}

const Vote: React.FC<VoteProps> = ({ onClose, gameData }) => {
  const [selectedUser, setSelectedUser] = useState<string>("");
  const [showCalculateVote, setShowCalculateVote] = useState<boolean>(false);
  const fireFetch = useFireFetch();

  const storedToken = localStorage.getItem("token");
  const tokenData = JSON.parse(storedToken);

  const handleUserChange = (value: string) => {
    setSelectedUser(value);
  };

  const handleVoteSubmit = () => {
    const myId = tokenData.id;
    fireFetch.updateData("game", gameData.id, {
      votedFor: arrayUnion({ by: myId, liar: selectedUser }),
    });
    console.log("voted for " + selectedUser);
    // setShowCalculateVote(true);
    onClose();
  };

  return (
    <>
      <Modal isOpen={!showCalculateVote} onClose={onClose}>
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
      {showCalculateVote && (
        <CalculateVote
          voteResults={selectedUser}
          gameId={gameData.id}
          onClose={onClose}
        />
      )}
    </>
  );
};

export default Vote;
