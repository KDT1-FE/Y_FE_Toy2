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
import { db } from "../../../firebase/firebase";
import { arrayUnion, updateDoc, doc, getDoc } from "firebase/firestore";
import calculateVote from "./CalculateVote";
import { useRecoilValue } from "recoil";
import { userState } from "../../../recoil/atoms/userState";
import { Socket } from "../../Main/CreateGameModal";

interface GameData {
  id: string;
  users: string[];
  votedFor: { by: string; liar: string }[];
}

interface VoteProps {
  onClose: (selectedUser: string) => void;
  onVoteResult: (result: string | null) => void;
  gameData: GameData;
  socket: Socket;
}

const Vote: React.FC<VoteProps> = ({
  onClose,
  onVoteResult,
  gameData,
  socket,
}): React.ReactElement => {
  const [selectedUser, setSelectedUser] = useState<string>("");
  const [fetchData, setFetchData] = useState<GameData | null>(null);
  // const fireFetch = useFireFetch();
  useEffect(() => {
    const fetchDataFromFirebase = async () => {
      try {
        const docRef = doc(db, "game", gameData.id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const updatedData = docSnap.data() as GameData;
          setFetchData(updatedData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchDataFromFirebase();
    // eslint-disable-next-line
  }, []);

  const user = useRecoilValue(userState);

  const handleUserChange = (value: string) => {
    setSelectedUser(value);
  };

  const handleVoteSubmit = async () => {
    if (selectedUser !== "") {
      try {
        const docRef = doc(db, "game", gameData.id);
        await updateDoc(docRef, {
          votedFor: arrayUnion({ by: user.id, liar: selectedUser }),
        });

        const updatedDocSnap = await getDoc(docRef);
        const updatedData = updatedDocSnap.data() as GameData;

        const voteResult = calculateVote(updatedData);
        onVoteResult(voteResult);

        socket.emit("message-to-server", voteResult + ":" + "%G@#C");
        onClose(selectedUser);
      } catch (error) {
        console.error("Error updating data:", error);
      }
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
                {fetchData &&
                  fetchData.users.map((user) => (
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
