import React, { useState, useEffect } from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Text,
} from "@chakra-ui/react";
import useFireFetch from "../../../hooks/useFireFetch";

interface CalculateVoteProps {
  voteResults: string;
  onClose: (finalLiar: string) => void;
}

const CalculateVote: React.FC<CalculateVoteProps> = ({
  voteResults,
  onClose,
  gameId,
}) => {
  const [finalLiar, setFinalLiar] = useState<string>("");
  const fireFetch = useFireFetch();

  // 투표 결과 계산 로직
  useEffect(() => {
    const calculateFinalLiar = async () => {
      const gameData = await fireFetch.useGetSome("game", "id", gameId);
      const { users, votedFor } = gameData.data[0];

      // 간단한 로직으로 가장 많이 지목된 유저를 선택
      const votesCount: Record<string, number> = {};
      users.forEach((user) => {
        if (votedFor.includes(user)) {
          votesCount[user] = (votesCount[user] || 0) + 1;
        }
      });

      let maxVotes = 0;
      for (const user in votesCount) {
        if (votesCount[user] > maxVotes) {
          maxVotes = votesCount[user];
          setFinalLiar(user);
        }
      }
    };

    calculateFinalLiar();
  }, [voteResults, gameId, fireFetch]);

  // 투표 결과 계산 후 최종 라이어를 부모 컴포넌트로 전달
  useEffect(() => {
    if (finalLiar) {
      onClose(finalLiar);
    }
  }, [finalLiar, onClose]);

  return (
    <Modal isOpen={true} onClose={() => {}}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>투표 결과 계산 중</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>투표 결과 계산 중입니다...</Text>
        </ModalBody>
        <ModalFooter>
          {/* 계산이 완료되면 버튼 활성화 */}
          {finalLiar && (
            <Button colorScheme="blue" onClick={() => onClose(finalLiar)}>
              계산 완료
            </Button>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CalculateVote;
