import {
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

interface Categories {
  category: string;
  keyword: string[];
}
[];

const Keyword = ({ status }: any) => {
  const [category, setCategory] = useState<Categories | null>(null);
  const [keyword, setKeyword] = useState("");

  const { isOpen, onClose } = useDisclosure();

  // 모달 자동 닫기
  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isOpen) {
      timer = setTimeout(() => {
        onClose();
      }, 2500);
    }
    return () => clearTimeout(timer);
  }, [isOpen, onClose]);

  // status 변화에 따라 localStorage에 저장
  useEffect(() => {
    if (status === "게임중") {
      const currentCategory = window.localStorage.getItem("category") ?? "";
      const currentKeyword = window.localStorage.getItem("keyword") ?? "";

      setCategory({ category: currentCategory, keyword: [currentKeyword] });
      setKeyword(currentKeyword);
    }
  }, [status]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} closeOnEsc={true}>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody>
          <Center fontWeight="bold" h="100%" fontSize="1.2rem" pt="20" pb="20">
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
  );
};

export default Keyword;
