import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import Drawing from '../../components/template/drawing';
import LeaveGameRoom from '../../components/layout/leaveGameRoom';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  chattingIdState,
  myMessageState,
  onlineUserStateInGameRoom,
  roomIdState,
  usersInRoom,
} from '../../states/atom';
import styled from 'styled-components';
import inviteImg from '../../assets/icons/invite.png';
import GameChatting from '../../components/template/GameChatting';
import { controlBack } from '../../hooks/leaveHandle';
import CheckUsersInGameRoom from '../../components/layout/checkUsersInGameRoom';
import CheckNums from '../../util/checkNums';
import { gameSocket } from '../../api/socket';
import AnswerForm from '../../components/template/AnswerForm';

const GameRoom: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [roomId, setRoomId] = useRecoilState(chattingIdState);
  const [buttonVisible, setButtonVisible] = useState(true);
  const [submitVisible, setSubmitVisible] = useState(false);
  const [ans, setAns] = useState('');
  const [myMessage, setMyMessage] = useRecoilState(myMessageState);
  let cntRef = useRef(0);

  useEffect(() => {
    // 채팅방 주소값 가져오기
    setMyMessage([]);
  }, []);

  useEffect(() => {
    if (id) {
      setRoomId(id.substring(1));
    }
  }, [id, setRoomId]);

  const shouldStartGame = CheckNums(); // 시작인원 설정
  console.log(shouldStartGame);
  const myId = localStorage.getItem('id');

  useEffect(() => {
    // shouldStartGame이 true일 때만 실행
    if (shouldStartGame && roomId) {
      gameSocket.connect();
      gameSocket.emit('joinRoom', roomId);

      // 서버로부터 'game' 이벤트 수신 리스너 설정
      gameSocket.on('game', (data) => {
        // 여기에서 필요한 상태 업데이트나 UI 반영
        console.log('this is', data);
        if (data.isBtnVisible === false && data.isSubmitVisible === true) {
          setButtonVisible(false);
          cntRef.current += 1;
          alert(`출제자는 바로 ${data.captain}`);
        }

        if (data.isSubmitVisible === true && data.captain === myId) {
          setSubmitVisible(true);
          cntRef.current += 1;
        }

        if (
          data.isSubmitVisible === false &&
          data.isBtnVisible === false &&
          data.userId === ''
        ) {
          setSubmitVisible(false);
          cntRef.current += 1;
          alert('이제 퀴즈 시작');
        }

        if (
          data.text === data.solution &&
          data.userId !== data.captain &&
          data.solution.length > 0
        ) {
          alert(`${data.userId}님이 승리했어요!`);
          setButtonVisible(true);
          cntRef.current = 0;
          gameSocket.emit('game', {
            roomId: roomId,
            captain: '',
            isBtnVisible: null,
            isSubmitVisible: null,
            solution: '',
            text: '',
            userId: '',
          });
          alert('다시 시작하려면 게임 시작 버튼을 눌러주세요');
        }

        if (
          data.text === data.solution &&
          data.userId === data.captain &&
          data.solution.length > 0
        ) {
          alert('방장님 뭐해요?');
          setButtonVisible(true);
          cntRef.current = 0;
          gameSocket.emit('game', {
            roomId: roomId,
            captain: '',
            isBtnVisible: null,
            isSubmitVisible: null,
            solution: '',
            text: '',
            userId: '',
          });
          alert('다시 시작하려면 게임 시작 버튼을 눌러주세요');
        }
      });

      return () => {
        gameSocket.off('game');
        gameSocket.disconnect();
      };
    }
  }, [shouldStartGame, roomId, myId]);
  console.log(cntRef.current);
  useEffect(() => {
    const lastMessage = myMessage[myMessage.length - 1];
    if (lastMessage && lastMessage?.text !== '' && ans.length > 0) {
      if (cntRef.current >= 0 && gameSocket?.connected) {
        gameSocket.emit('game', {
          roomId: roomId,
          captain: myId,
          isBtnVisible: false,
          isSubmitVisible: false,
          solution: ans,
          text: lastMessage.text,
          userId: lastMessage.userId,
        });
      } else {
        console.warn('Socket is not connected or cntRef is less than 3.');
      }
    }
  }, [cntRef.current, gameSocket, myId, roomId, ans, myMessage]);

  useEffect(() => {
    // 소켓이 존재하고 연결이 끊어진 경우
    if (gameSocket && !gameSocket.connected) {
      console.log('Socket disconnected. Reconnecting...');
      gameSocket.connect();
      if (roomId) {
        gameSocket.emit('joinRoom', roomId);
      }
    }
  }, [gameSocket, roomId]);

  const handleGameStart = () => {
    console.log('게임이 시작되었습니다!');
    // 서버에 'game' 이벤트 전송
    if (gameSocket?.connected) {
      gameSocket.emit('game', {
        roomId: roomId,
        captain: myId,
        isBtnVisible: false,
        isSubmitVisible: true,
        solution: '',
        text: '',
        userId: '',
      });
    } else {
      console.warn('Socket is not connected.');
    }
  };

  const handleSubmit = (answer: string) => {
    console.log('정답 입력해주세요');
    setAns(answer);
    if (gameSocket?.connected) {
      gameSocket.emit('game', {
        roomId: roomId,
        captain: myId,
        isBtnVisible: false,
        isSubmitVisible: false,
        solution: answer,
        text: '',
        userId: '',
      });
    } else {
      console.warn('Socket is not connected.');
    }
  };
  controlBack();

  const roomNum = useRecoilValue(roomIdState);
  const users = useRecoilValue(usersInRoom);

  return (
    <Game>
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
          <LeaveGameRoom chatId={roomId}></LeaveGameRoom>
          {buttonVisible && shouldStartGame && (
            <button onClick={handleGameStart}>게임 시작</button>
          )}
          {submitVisible && <AnswerForm onSubmit={handleSubmit} />}
        </BtnGroup>
      </RoomHeader>

      <RoomMain>
        <Drawing />
        <GameChatting chatId={roomId} />
      </RoomMain>
      <CheckUsersInGameRoom chatId={roomId}></CheckUsersInGameRoom>
      <UserList>{/* <CheckUser /> */}</UserList>
    </Game>
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
  margin-left: 260px;
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
