import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import styled from "styled-components";
import data from "../../../data/category.json";

interface Categories {
  category: string;
  keyword: string[];
}
[];

const Div = styled.div`
  margin: 20rem;
`;

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
    setCategory(selectedCategory);
    window.localStorage.setItem("category", selectedCategory.category);

    const ranKeyword =
      selectedCategory.keyword[getRandNum(selectedCategory.keyword.length)];
    setKeyword(ranKeyword);
    window.localStorage.setItem("keyword", ranKeyword);

    const ranLiar = users.name[getRandNum(users.name.length)];
    if (ranLiar === "연수") {
      window.localStorage.setItem("liar", "true");
    } else {
      window.localStorage.setItem("liar", "false");
    }
    onOpen();
  };

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
    <Div>
      {status === "대기중" && <Button onClick={handleStart}>게임시작</Button>}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent width={300} height={200}>
          <ModalCloseButton />
          <ModalBody>
            <p>주제는 {category?.category} 입니다.</p>
            {window.localStorage.getItem("liar") === "true" ? (
              <>
                <p>당신은 Liar 입니다.</p>
                <p>키워드를 추리하세요.</p>
              </>
            ) : (
              <p>키워드는 {keyword} 입니다.</p>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
      <Box>
        {status === "게임중" && (
          <>
            <p>주제는 {window.localStorage.getItem("category")} 입니다.</p>
            {window.localStorage.getItem("liar") === "true" ? (
              <>
                <p>당신은 Liar 입니다.</p>
                <p>키워드를 추리하세요.</p>
              </>
            ) : (
              <p>키워드는 {window.localStorage.getItem("keyword")} 입니다.</p>
            )}
            <Button onClick={hadleEnd}>게임 종료</Button>
          </>
        )}
      </Box>
    </Div>
  );
};

export default Keyword;
