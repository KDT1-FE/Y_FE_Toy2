import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Drawing from '../../components/template/drawing';
import LeaveGameRoom from '../../components/layout/leaveGameRoom';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  AnswerFormState,
  buttonState,
  chattingIdState,
  myMessageState,
} from '../../states/atom';
import styled from 'styled-components';
import inviteImg from '../../assets/icons/invite.png';
import GameChatting from '../../components/template/GameChatting';
import { controlBack } from '../../hooks/leaveHandle';
import CheckUsersInGameRoom from '../../components/layout/checkUsersInGameRoom';
import CheckNums from '../../util/checkNums';
import { Socket, io } from 'socket.io-client';

interface AnswerFormProps {
  onSubmit: (answer: string) => void;
}

const AnswerForm: React.FC<AnswerFormProps> = ({ onSubmit }) => {
  const [answer, setAnswer] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(answer);
    setAnswer('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        정답:
        <input
          type="text"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
        />
      </label>
      <button type="submit">제출</button>
    </form>
  );
};

const GameRoom: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [chat, setChat] = useRecoilState(chattingIdState);
  const [buttonVisible, setButtonVisible] = useRecoilState(buttonState);
  const [showAnswerForm, setShowAnswerForm] = useRecoilState(AnswerFormState);
  const [whoIsCaptain, SetWhoIsCaptain] = useState('');
  const [solution, setSolution] = useState('');
  const [criteria, setCriteria] = useState(0);
  const [myMessage, setMyMessage] = useRecoilState(myMessageState);
  const [currentMessageObject, setCurrentMessageObject] =
    useRecoilState(myMessageState);
  const [socket, setSocket] = useState<any>(null);
  // console.log(myMessage[myMessage.length - 1].text);
  useEffect(() => {
    // 채팅방 주소값 가져오기
    setMyMessage([]);
  }, []);
  useEffect(() => {
    if (id) {
      setChat(id.substring(1));
    }
  }, [id, setChat]);

  controlBack();
  const shouldStartGame = CheckNums(); // 시작인원 설정
  const myId = localStorage.getItem('id');

  useEffect(() => {
    try {
      const socket: Socket = io('http://localhost:3001');
      setSocket(socket);

      socket.on('game', (data) => {
        // 서버에서 게임초기 데이터 가져오기
        console.log(data);
      });
    } catch (error) {
      console.error(error);
    }
  });
  // const handleGameEvent = (data: any) => {
  //   console.log('Received data:', data);

  //   if (data.captain === myId && criteria === 1) {
  //     alert('Your turn');
  //     setShowAnswerForm(true);
  //     setCriteria((prevCriteria) => prevCriteria + 1);
  //     // socket.emit('game', {
  //     //   captain: myId,
  //     //   solution: solution,
  //     //   chatID: chat,
  //     // });
  //   }
  //   console.log(myMessage[myMessage.length - 1]);

  //   if (
  //     solution === myMessage[myMessage.length - 1].text &&
  //     chat === myMessage[myMessage.length - 1].chatId
  //   ) {
  //     if (data.captain !== myId) {
  //       alert(`The winner is ${myMessage[myMessage.length - 1].userId}`);
  //       // recoil 초기화
  //       setCurrentMessageObject([{ text: '', userId: '', chatId: '' }]);
  //     } else {
  //       alert("Captain can't answer the question");
  //     }
  //   }
  // };
  // useEffect(() => {
  //   if (shouldStartGame) {
  //     const socket: Socket = io('http://localhost:3001');
  //     console.log(socket);

  //     // 클라이언트에서 'joinRoom' 이벤트 보내기
  //     // socket.emit('game', { chatId: chat });

  //     // socket.on('joinRoom', (data) => {
  //     //   console.log('Join room data received:', data);
  //     // });

  //     if (myMessage[myMessage.length - 1].text !== '') {
  //       console.log(myMessage[myMessage.length - 1].text);
  //       socket.emit('game', {
  //         captain: whoIsCaptain,
  //         solution: solution,
  //         chatID: chat,
  //       });
  //     }

  //     // 서버에서 'game' 이벤트 수신 및 처리
  //     socket.on('game', handleGameEvent);

  //     // 언마운트 시 'game' 이벤트 리스너 제거
  //     return () => {
  //       socket.off('game', handleGameEvent);
  //     };
  //   }
  // }, [chat]);

  const handleGameStart = () => {
    setCriteria((prevCriteria) => prevCriteria + 1);
    if (myId) {
      SetWhoIsCaptain(myId);
    }
    setButtonVisible(false);
  };

  const handleAnswerSubmit = (answer: string) => {
    setSolution(answer);
    socket.emit('game', {
      // 서버로 데이터 보내기
      captain: whoIsCaptain,
      solution: solution,
      chatID: chat,
      setIs,
    });
    setShowAnswerForm(false);
  };

  return (
    <>
      {showAnswerForm && <AnswerForm onSubmit={handleAnswerSubmit} />}
      <Game>
        <RoomHeader>
          <RoomInfo>
            <RoomInformation>방 번호</RoomInformation>
            <RoomInformation>{id?.slice(1, 5)}</RoomInformation>
            <RoomInformation>인원 수 </RoomInformation>
            <RoomInformation>3 / 4</RoomInformation>
            {/* 인원수 추가 */}
          </RoomInfo>
          {/* <InviteGameRoom chatId={chat}></InviteGameRoom> */}
          <BtnGroup>
            <InviteBtn>
              <InviteImage src={inviteImg} alt="Invite" />
              <div>초대하기</div>
            </InviteBtn>
            {shouldStartGame && buttonVisible && (
              <button onClick={handleGameStart}>게임 시작</button>
            )}
            <LeaveGameRoom chatId={chat}></LeaveGameRoom>
          </BtnGroup>
        </RoomHeader>

        <RoomMain>
          <Drawing />

          <GameChatting chatId={chat} />
        </RoomMain>
        <CheckUsersInGameRoom chatId={chat}></CheckUsersInGameRoom>
        {/* <UserList>
          <CheckUser />
        </UserList> */}
      </Game>
    </>
  );
};

const Game = styled.div`
  width: 1200px;
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
  margin-left: 140px;
`;

const InviteBtn = styled.button`
  background-color: #38b2ac;
  color: white;
  padding: 6px 25px;
  border-radius: 7px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  transition: 0.2s;

  div {
    margin-left: 18px;
  }

  &:hover {
    background-color: #4fd1c5;
  }
`;

const InviteImage = styled.img`
  position: absolute;
  top: 9.5px;
  left: 20px;
  width: 22px;
  height: 22px;
`;

const RoomMain = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

const UserList = styled.div`
  margin-top: 20px;
`;
export default GameRoom;
