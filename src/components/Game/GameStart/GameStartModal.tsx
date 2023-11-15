// import {
//   Center,
//   Flex,
//   Modal,
//   ModalBody,
//   ModalCloseButton,
//   ModalContent,
//   ModalOverlay,
//   useDisclosure,
// } from "@chakra-ui/react";
// import { useEffect, useState } from "react";

// const GameStartModal = () => {
//   const { isOpen, onClose, onOpen } = useDisclosure();
//   const [showStartModal, setShowStartModal] = useState(false);

//   useEffect(() => {
//     if (showStartModal) {
//       onOpen();
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [showStartModal]);

//   // 모달 자동 닫기 로직
//   useEffect(() => {
//     let timer: NodeJS.Timeout;

//     if (isOpen) {
//       timer = setTimeout(() => {
//         onClose();
//       }, 2500);
//     }
//     return () => clearTimeout(timer);
//   }, [isOpen, onClose]);

//   return (
//     <Modal isOpen={isOpen} onClose={onClose} closeOnEsc={true}>
//       <ModalOverlay />
//       <ModalContent>
//         <ModalCloseButton />
//         {showStartModal && (
//           <ModalBody>
//             <Center
//               fontWeight="bold"
//               h="100%"
//               fontSize="1.2rem"
//               pt="20"
//               pb="20"
//             >
//               <Flex
//                 direction="column"
//                 alignContent="center"
//                 justifyContent="center"
//               >
//                 <Center>주제는 {category} 입니다.</Center>
//                 {window.localStorage.getItem("liar") === user.id ? (
//                   <>
//                     <Center>당신은 Liar 입니다.</Center>
//                     <Center>키워드를 추리하세요.</Center>
//                   </>
//                 ) : (
//                   <Center>키워드는 {keyword} 입니다.</Center>
//                 )}
//               </Flex>
//             </Center>
//           </ModalBody>
//         )}
//       </ModalContent>
//     </Modal>
//   );
// };

// export default GameStartModal;
