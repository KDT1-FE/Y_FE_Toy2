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

const Keyword = () => {
  const categories = data.CategoryList;
  const [category, setCategory] = useState<Categories | null>(null);
  const [keyword, setKeyword] = useState("");

  const users = data.users;
  const [liar, setLiar] = useState("");
  const [isLiar, setIsLiar] = useState(false);

  const { isOpen, onClose, onOpen } = useDisclosure();

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isOpen) {
      timer = setTimeout(() => {
        onClose();
      }, 2000);
    }
    return () => clearTimeout(timer);
  }, [isOpen, onClose]);

  const getRandNum = (length: number): number => {
    const randNum = Math.floor(Math.random() * length);

    return randNum;
  };

  const handleStart = () => {
    onOpen();

    const selectedCategory = categories[getRandNum(categories.length)];
    setCategory(selectedCategory);
    setKeyword(
      selectedCategory.keyword[getRandNum(selectedCategory.keyword.length)],
    );

    setLiar(users.name[getRandNum(users.name.length)]);
    if (liar === "연수") {
      setIsLiar(true);
    } else {
      setIsLiar(false);
    }
  };

  return (
    <Div>
      <Button onClick={handleStart}>게임시작</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent width={420} height={375}>
          <ModalCloseButton />
          <ModalBody>
            <p>주제는 {category?.category} 입니다.</p>
            {isLiar ? (
              <p>당신은 Liar 입니다. 키워드를 추리하세요.</p>
            ) : (
              <p>키워드는 {keyword} 입니다.</p>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
      <Box>
        {category && (
          <>
            <p>주제는 {category?.category} 입니다.</p>
            {isLiar ? (
              <>
                <p>당신은 Liar 입니다.</p>
                <p>키워드를 추리하세요.</p>
              </>
            ) : (
              <p>키워드는 {keyword} 입니다.</p>
            )}
          </>
        )}
      </Box>
    </Div>
  );
};

export default Keyword;
