import {
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  Center,
  Flex,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import data from "../../../data/category.json";
import { useRecoilValue } from "recoil";
import { userState } from "../../../recoil/atoms/userState";

interface GameStartProps {
  status: string;
  updateStatus: (newStatus: string) => void;
  gameData: any;
  onGameStart: (shuffledUsers: any) => void; // 게임 시작 시 호출할 콜백
}

interface Categories {
  category: string;
  keyword: string[];
}
[];

interface UserWithSort {
  value: string;
  sort: number;
}

const GameStart: React.FC<GameStartProps> = ({
  status,
  updateStatus,
  gameData,
  onGameStart,
}) => {
  const user = useRecoilValue(userState);
  console.log(gameData);

  const categories = data.CategoryList;
  const users = data.users;
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [category, setCategory] = useState<Categories | null>(null);
  const [keyword, setKeyword] = useState("");

  // 모달 자동 닫기 로직
  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isOpen) {
      timer = setTimeout(() => {
        onClose();
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [isOpen, onClose]);

  // 랜덤 숫자 계산 함수
  const getRandNum = (length: number): number => {
    return Math.floor(Math.random() * length);
  };

  // 게임 시작 함수
  const handleStart = async () => {
    await updateStatus("게임중");

    const selectedCategory = categories[getRandNum(categories.length)];
    const ranKeyword =
      selectedCategory.keyword[getRandNum(selectedCategory.keyword.length)];
    const ranLiar = users.name[getRandNum(users.name.length)];

    setCategory(selectedCategory);
    setKeyword(ranKeyword);

    // 유저 순서 랜덤으로 섞기
    const shuffledUsers: string[] = gameData.users
      .map(
        (userId: string): UserWithSort => ({
          value: userId, // 실제 유저 ID
          sort: Math.random(), // 랜덤 정렬을 위한 값
        }),
      )
      .sort((a: UserWithSort, b: UserWithSort): number => a.sort - b.sort)
      .map(({ value }: UserWithSort): string => value);

    window.localStorage.setItem("shuffledUsers", JSON.stringify(shuffledUsers));
    window.localStorage.setItem("category", selectedCategory.category);
    window.localStorage.setItem("keyword", ranKeyword);
    window.localStorage.setItem("liar", ranLiar === user.id ? "true" : "false");
    onOpen();
    onGameStart(shuffledUsers);
  };

  // 게임 종료
  const hadleEnd = () => {
    updateStatus("대기중");

    window.localStorage.setItem("category", "");
    window.localStorage.setItem("keyword", "");
    window.localStorage.setItem("liar", "false");
    setCategory(null);
    setKeyword("");
  };

  return (
    <>
      {status === "대기중" ? (
        <Button w="200px" mr="20px" onClick={handleStart}>
          게임시작
        </Button>
      ) : (
        <Button w="200px" mr="20px" onClick={hadleEnd}>
          게임 종료
        </Button>
      )}
      <Modal isOpen={isOpen} onClose={onClose} closeOnEsc={true}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <Center
              fontWeight="bold"
              h="100%"
              fontSize="1.2rem"
              pt="20"
              pb="20"
            >
              <Flex
                direction="column"
                alignContent="center"
                justifyContent="center"
              >
                <Center>주제는 {category?.category} 입니다.</Center>
                {window.localStorage.getItem("liar") === "true" ? (
                  <>
                    <Center>당신은 Liar 입니다.</Center>
                    <Center>키워드를 추리하세요.</Center>
                  </>
                ) : (
                  <Center>키워드는 {keyword} 입니다.</Center>
                )}
              </Flex>
            </Center>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default GameStart;
