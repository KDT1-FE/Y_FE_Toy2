import {
  Button,
  Center,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import data from "../../../data/category.json";

interface Categories {
  category: string;
  keyword: string[];
}
[];

const Keyword = ({ status, updateStatus }: any) => {
  const categories = data.CategoryList;
  const [category, setCategory] = useState<Categories | null>(null);
  const [keyword, setKeyword] = useState("");
  const users = data.users;

  const { isOpen, onClose, onOpen } = useDisclosure();

  // 모달 자동 닫기
  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isOpen) {
      timer = setTimeout(() => {
        onClose();
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [isOpen, onClose]);

  // 랜덤 숫자 계산
  const getRandNum = (length: number): number => {
    const randNum = Math.floor(Math.random() * length);

    return randNum;
  };

  // 게임 시작
  const handleStart = async () => {
    await updateStatus("게임중");

    const selectedCategory = categories[getRandNum(categories.length)];
    const ranKeyword =
      selectedCategory.keyword[getRandNum(selectedCategory.keyword.length)];
    const ranLiar = users.name[getRandNum(users.name.length)];

    setCategory(selectedCategory);
    setKeyword(ranKeyword);

    window.localStorage.setItem("category", selectedCategory.category);
    window.localStorage.setItem("keyword", ranKeyword);
    if (ranLiar === "연수") {
      window.localStorage.setItem("liar", "true");
    } else {
      window.localStorage.setItem("liar", "false");
    }
    onOpen();
  };

  // status 변화에 따라 localStorage에 저장
  useEffect(() => {
    if (status === "게임중") {
      const currentCategory = window.localStorage.getItem("category") ?? "";
      const currentKeyword = window.localStorage.getItem("keyword") ?? "";

      setCategory({ category: currentCategory, keyword: [currentKeyword] });
      setKeyword(currentKeyword);
    }
  }, [status]);

  // 게임 종료
  const hadleEnd = async () => {
    await updateStatus("대기중");

    window.localStorage.setItem("category", "");
    window.localStorage.setItem("keyword", "");
    window.localStorage.setItem("liar", "false");
    setCategory(null);
    setKeyword("");
  };

  return (
    <>
      {status === "대기중" ? (
        <Button onClick={handleStart}>게임시작</Button>
      ) : (
        <Button onClick={hadleEnd}>게임 종료</Button>
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

export default Keyword;
