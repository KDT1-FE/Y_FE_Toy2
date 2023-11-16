import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import Drawing from '../../components/template/drawing';
import LeaveGameRoom from '../../components/layout/leaveGameRoom';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  btnState,
  chattingIdState,
  myMessageState,
  roomIdState,
  submitState,
  usersInRoom,
} from '../../states/atom';
import styled from 'styled-components';
import GameChatting from '../../components/template/GameChatting';
import { controlBack } from '../../hooks/leaveHandle';
import CheckUsersInGameRoom from '../../components/layout/checkUsersInGameRoom';
import CheckNums from '../../util/checkNums';
import { gameSocket } from '../../api/socket';
import AnswerForm from '../../components/template/AnswerForm';
import { ResponsiveValue } from '@chakra-ui/react';
import { getCookie } from '../../util/util';
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Box,
  Fade,
  Img,
} from '@chakra-ui/react';
import AnswerModal from '../../components/layout/anwerModal.tsx';

const GameRoom: React.FC = () => {
  const [showAlert, setShowAlert] = useState({
    active: false,
    message: '',
  });

  useEffect(() => {
    if (showAlert.active) {
      const timer = setTimeout(() => {
        setShowAlert({ active: false, message: '' });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showAlert.active]);

  const { id } = useParams<{ id: string }>();
  const [roomId, setRoomId] = useRecoilState(chattingIdState);
  const [isQuizMasterAlertShown, setIsQuizMasterAlertShown] = useState(false); //출제자 확인알람 추가
  const [answer, setAnswer] = useState<string>(''); // 답 지정하기
  const [messages, setMessages] = useRecoilState(myMessageState); // 채팅창 메세지 받기
  const [userMessage, setUserMessage] = useState<{
    chatId: string;
    text: string;
    userId: string;
  }>({
    chatId: '',
    text: '',
    userId: '',
  });

  const lastMessage = messages[messages.length - 1];
  const myId = getCookie('userId');
  const check = CheckNums();

  const [answerModalOpen, setAnswerModalOpen] = useState(false);

  useEffect(() => {
    if (lastMessage.text !== '') {
      setUserMessage(lastMessage);
    }
  }, [lastMessage]);

  useEffect(() => {
    if (id) {
      setRoomId(id.substring(1));
    }
  }, [id, setRoomId]);

  // 게임로직 소켓
  useEffect(() => {
    gameSocket.connect();

    gameSocket.emit('joinRoom', roomId);

    gameSocket.on('quiz_master_set', (quizMasterId: string) => {
      console.log('여기', myId, quizMasterId);
      if (true) {
        if (myId === quizMasterId) {
          // alert('당신은 출제자 입니다!');
          setShowAlert({
            active: true,
            message: '당신은 출제자 입니다!',
          });
        } else {
          setShowAlert({
            active: true,
            message: '새로운 출제자가 선정되었습니다!',
          });
        }
        setIsQuizMasterAlertShown(true);
      }
    });

    return () => {
      gameSocket.off('quiz_master_set');
    };
  }, [roomId]);

  const startGame = async () => {
    gameSocket.emit('start_game', { roomId, myId });
    setIsQuizMasterAlertShown(false);
    setAnswerModalOpen(true);
  };

  const submitSetAnswer = (modalInputValue: string) => {
    gameSocket.emit('set_answer', modalInputValue, {
      roomId,
      myId,
      notifyAll: true,
    });
    setAnswer('');
  };

  const handleCloseModal = () => {
    setAnswerModalOpen(false);
  };

  useEffect(() => {
    gameSocket.on('alert_all', (message: string) => {
      if (message) {
        setShowAlert({
          active: true,
          message: '문제가 출제되었습니다!',
        });
      }
    });
    return () => {
      gameSocket.off('alert_all');
    };
  }, [roomId]);

  useEffect(() => {
    if (userMessage) {
      if (userMessage.userId === myId) {
        gameSocket.emit('submit_answer', userMessage, { roomId, myId });
      }
    }
    const handleCorrectAnswer = (data: { winner: string }) => {
      console.log(data.winner, myId);
      if (data.winner === myId) {
        setShowAlert({
          active: true,
          message: '축하합니다! 정답입니다! 게임이 종료되었습니다.',
        });
      } else if (data.winner !== myId) {
        setShowAlert({
          active: true,
          message: '유저가 정답을 맞췄습니다! 게임이 종료되었습니다.',
        });
      }
    };
    gameSocket.on('correct_answer', handleCorrectAnswer);

    return () => {
      gameSocket.off('correct_answer', handleCorrectAnswer);
    };
  }, [roomId, gameSocket, userMessage]);

  const roomNum = useRecoilValue(roomIdState);
  const users = useRecoilValue(usersInRoom);

  return (
    <Game>
      <AnswerModal
        isOpen={answerModalOpen}
        onSubmit={submitSetAnswer}
        onClose={handleCloseModal}
      />
      <RoomHeader>
        <RoomInfo>
          <RoomInformation>방 번호</RoomInformation>
          <RoomInformation>{roomNum}</RoomInformation>
          <RoomInformation>인원 수 </RoomInformation>
          <RoomInformation>{users} / 4</RoomInformation>
          {/* 인원수 추가 */}
        </RoomInfo>
        {/* <InviteGameRoom chatId={chat}></InviteGameRoom> */}
        <BtnGroup>
          <Button onClick={startGame}>
            <Img
              width="18px"
              height="18px"
              src="/assets/start.svg"
              alt="start"
              color="white"
              marginRight={1}
            />
            게임 시작
          </Button>
          <LeaveGameRoom chatId={roomId}></LeaveGameRoom>

          {/* {check && btnVisible && (
            
    
          )} */}

          {/* {submitVisible && <AnswerForm onSubmit={handleSubmit} />} */}
        </BtnGroup>
      </RoomHeader>

      <RoomMain>
        <Drawing />
        <UserList>
          <GameChatting chatId={roomId} />
        </UserList>
      </RoomMain>
      <CheckUsersInGameRoom chatId={roomId} />
      <Fade in={showAlert.active}>
        <Alert
          bg={'#4FD1C5'}
          color={'white'}
          position="fixed" // 고정된 위치에 표시
          top="20px" // 상단에서 20px 떨어진 위치
          left="50%" // 왼쪽에서 50% 떨어진 위치
          transform="translateX(-50%)" // X축 기준 중앙 정렬
          zIndex="1000" // 다른 요소들 위에 오도록 z-index 설정
          status="success"
          width={400}
          height={70}
          borderRadius={10}>
          <AlertIcon color={'white'} />
          <Box>
            <AlertTitle mr={2}>GameRoom</AlertTitle>
            <AlertDescription>{showAlert.message}</AlertDescription>
          </Box>
        </Alert>
      </Fade>
    </Game>
  );
};

const Game = styled.div`
  width: 1400px;
  display: flex;
  flex-direction: column;
`;

const RoomHeader = styled.div`
  display: flex;
  justify-content: end;
  margin-top: 30px;
`;

const RoomInfo = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  justify-content: center;
  align-items: center;
  background: #fff;
  border-radius: 10px;
  text-align: center;
  border-radius: 10px;
  border: 1px solid #e2e8f0;
  color: #718096;
`;

const RoomInformation = styled.div`
  padding: 5px;

  &:first-child {
    background-color: #edf2f7;
    padding-left: 15px;
    padding-right: 15px;
  }

  &:nth-child(3) {
    background-color: #edf2f7;
  }
`;

const BtnGroup = styled.div`
  display: flex;
  align-items: center;
  margin-left: 260px;
`;

const RoomMain = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

const UserList = styled.div`
  margin-top: 30px;
  margin-bottom: 30px;
`;

const Button = styled.button`
  background-color: #38b2ac;
  color: white;
  padding: 6px 25px;
  border-radius: 7px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  transition: 0.2s;
  margin-left: 10px;

  div {
    margin-left: 20px;
  }

  &:hover {
    background-color: #4fd1c5;
  }
`;

export default GameRoom;
