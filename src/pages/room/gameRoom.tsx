import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Drawing from '../../components/template/drawing';
import LeaveGameRoom from '../../components/layout/leaveGameRoom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { chattingIdState } from '../../states/atom';
// import InviteGameRoom from '../../components/template/inviteGameRoom';
import styled from 'styled-components';
import inviteImg from '../../assets/icons/invite.png';
import GameChatting from '../../components/template/GameChatting';
// import CheckUser from '../../components/template/CheckUser';
import { controlBack } from '../../hooks/leaveHandle';
import CheckUsersInGameRoom from '../../components/layout/checkUsersInGameRoom';
import { sortCreatedAt } from '../../util/util';
import { Chat, ChatResponse } from '../../interfaces/interface';
import { getAllGameRooms } from '../../api';

const GameRoom = () => {
  const { id } = useParams();
  const [chat, setChat] = useRecoilState(chattingIdState);
  const [roomNumber, setRoomNumber] = useState<number | null>(null);
  const [roomUser, setRoomUser] = useState<number | null>(null);
  const [allRooms, setAllRooms] = useState<ChatResponse | null>(null);

  useEffect(() => {
    if (id) {
      setChat(id.substring(1));
    }
    fetchRoomNumber();
    if (allRooms && roomNumber && id) {
      fetchRoomUser();
    }
  }, [id, setChat]);
  // controlGameRoomReload(chat);
  controlBack();

  const fetchRoomNumber = async () => {
    try {
      const allRoomsData = await getAllGameRooms();
      setAllRooms(allRoomsData);
      const createAtData: Chat[] = await sortCreatedAt(allRoomsData);
      // 방번호 넣기
      const plusIndex = {
        ...createAtData,
        chats: createAtData.map((chat, index) => ({
          ...chat,
          index: index + 1,
        })),
      };

      const findIndex = async (
        chatData: ChatResponse,
        chatId: string,
      ): Promise<number | null> => {
        const foundChat = await plusIndex?.chats.find(
          (chat) => chat.id === chatId,
        );
        if (foundChat) {
          return foundChat.index;
        }
        return null;
      };

      const roomData = await findIndex(plusIndex, chat);
      setRoomNumber(roomData);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchRoomUser = async () => {
    try {
      const findUser = async (
        chatData: ChatResponse | null,
        chatId: string,
      ): Promise<number | null> => {
        const foundChat = await allRooms?.chats.find(
          (chat) => chat.id === chatId,
        );
        if (foundChat) {
          return foundChat.users.length;
        }
        return null;
      };
      const roomUser = await findUser(allRooms, chat);

      setRoomUser(roomUser);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Game>
      <RoomHeader>
        <RoomInfo>
          <RoomInformation>방 번호</RoomInformation>
          <RoomInformation>{roomNumber}</RoomInformation>
          <RoomInformation>인원 수 </RoomInformation>
          <RoomInformation>{roomUser} / 4</RoomInformation>
          {/* 인원수 추가 */}
        </RoomInfo>
        {/* <InviteGameRoom chatId={chat}></InviteGameRoom> */}
        <BtnGroup>
          <LeaveGameRoom chatId={chat}></LeaveGameRoom>
        </BtnGroup>
      </RoomHeader>

      <RoomMain>
        <Drawing />

        <GameChatting chatId={chat} />
      </RoomMain>

      <CheckUsersInGameRoom chatId={chat}></CheckUsersInGameRoom>
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
