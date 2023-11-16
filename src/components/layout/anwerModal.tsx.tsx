import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
  FormLabel,
  FormControl,
} from '@chakra-ui/react';
import { useState } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (value: string) => void;
}

const AnswerModal: React.FC<ModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [answer, setAnswer] = useState('');

  const handleSetAnswerChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setAnswer(event.target.value);
  };

  const handleAnswerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(answer);
    }
    onClose();
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent height="250px">
          {/* <ModalHeader>제시어 입력</ModalHeader> */}
          <ModalBody display={'flex'} alignItems={'center'}>
            <form onSubmit={handleAnswerSubmit}>
              <FormControl marginTop={1} marginBottom={5}>
                <FormLabel marginBottom={5}>제시어 입력</FormLabel>
                <Input
                  marginBottom={5}
                  placeholder={'제시어를 입력해 주세요.'}
                  _placeholder={{ fontSize: 'sm' }}
                  borderColor={'gray.200'}
                  autoComplete="on"
                  type="text"
                  value={answer}
                  onChange={(e) => handleSetAnswerChange(e)}
                  width="400px"
                  height="50px"
                  justifyContent={'center'}
                />
              </FormControl>
              <Button
                width="400px"
                height="50px"
                type="submit"
                size="lg"
                color="white"
                bg={'#4FD1C5'}
                _hover={{
                  bg: '#9AEBE0',
                }}
                _disabled={{
                  bg: '#CBD5E0',
                }}>
                입력 완료
              </Button>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AnswerModal;
