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
import calculateVote from "./CalculateVote";
import { useRecoilValue } from "recoil";
import { userState } from "../../../recoil/atoms/userState";

interface GameData {
  id: string;
  users: string[];
  votedFor: { by: string; liar: string }[];
}

interface VoteProps {
  onClose: (selectedUser: string) => void;
  onVoteResult: (result: string | null) => void;
  gameData: GameData;
}

const Vote: React.FC<VoteProps> = ({
  onClose,
  gameData,
}): React.ReactElement => {
  const [selectedUser, setSelectedUser] = useState<string>("");
  const fireFetch = useFireFetch();
  const fetchData = fireFetch.useGetSome("game", "id", gameData.id)
    .data[0] as GameData;

  const user = useRecoilValue(userState);

  const handleUserChange = (value: string) => {
    setSelectedUser(value);
  };

  const handleVoteSubmit = () => {
    if (selectedUser !== "") {
      fireFetch.updateData("game", gameData.id, {
        votedFor: arrayUnion({ by: user.id, liar: selectedUser }),
      });

      console.log("fetchData", fetchData);
      const voteResult = calculateVote(fetchData);

      console.log("Vote result: " + voteResult);

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
