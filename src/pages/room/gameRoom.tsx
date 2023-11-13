import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Drawing from '../../components/template/drawing';
import LeaveGameRoom from '../../components/layout/leaveGameRoom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { chattingIdState, onlineUserStateInGameRoom } from '../../states/atom';
import styled from 'styled-components';
import inviteImg from '../../assets/icons/invite.png';
import GameChatting from '../../components/template/GameChatting';
import { controlBack } from '../../hooks/leaveHandle';
import CheckUsersInGameRoom from '../../components/layout/checkUsersInGameRoom';
import CheckNums from '../../util/checkNums';
import { gameSocket } from '../../api/socket';

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
  const [buttonVisible, setButtonVisible] = useState(true);
  const [winner, setWinner] = useState('');
  const users = useRecoilValue(onlineUserStateInGameRoom);
  const [showAnswerForm, setShowAnswerForm] = useState(false);
  const [solution, setSolution] = useState('');
  const [criteria, setCriteria] = useState(0);
  let start = false;

  useEffect(() => {
    if (id) {
      setChat(id.substring(1));
    }
  }, [id, setChat]);

  controlBack();
  let shouldStartGame = CheckNums();
  useEffect(() => {
    if (shouldStartGame) {
      const myId = localStorage.getItem('id');
      start = true;
      const socket = gameSocket.connect();

      socket.emit('game', {
        chatID: id,
        captain: myId,
        solution: solution,
        winner,
        start,
      });

      socket.on('game', (data) => {
        console.log('Received data:', data);
        if (data.captain === myId) {
          setShowAnswerForm(true);
        }
        // 만약 data.solution과 채팅.text가 같다면 winner를 채팅.userId 변경
        // if (data.start === true) {
        // }
        if (data.winner.length > 0) {
          alert('승자가 정해졌어요');
          socket.off('game');
        }
      });

      setButtonVisible(false);
    }

    return () => {
      gameSocket.off('game');
    };
  }, [criteria]);
  const handleGameStart = () => {
    setCriteria((prevCriteria) => prevCriteria + 1);
  };

  const handleAnswerSubmit = (answer: string) => {
    setSolution(answer);
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
            {shouldStartGame && (
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
