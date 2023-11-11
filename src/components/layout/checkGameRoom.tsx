import { useRecoilState, useRecoilValue } from 'recoil';
import { accessTokenState, allRoomState } from '../../states/atom';
import { getAllGameRooms, participateGameRoom } from '../../api';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { io } from 'socket.io-client';
import { SERVER_URL, SERVER_ID } from '../../constant';
const CheckGameRoom = () => {
  const navigate = useNavigate();
  const [allRooms, setAllRooms] = useRecoilState(allRoomState);
  const accessToken: any = useRecoilValue(accessTokenState);

  useEffect(() => {
    async () => {
      try {
        const allRoomsData = await getAllGameRooms(accessToken);
        setAllRooms(allRoomsData.chats);
      } catch (error) {
        console.error('Error retrieving data:', error);
      }
    };
  }, []);
  // loginSocket활용할것

  // usePollingData(fetchData, [allRooms, setAllRooms]);

  const handleParticipate = async (numberOfPeople: number, chatId: any) => {
    if (numberOfPeople === 4) {
      alert('방이 꽉 찼어요.');
    } else {
      await participateGameRoom(chatId, accessToken);
      navigate(`/room/:${chatId}`);
    }
  };

  return (
    <>
      {allRooms.map((element, index) => (
        <div
          key={index}
          onClick={() => handleParticipate(element.users.length, element.id)}>
          <p>{element.name}</p>
          <p>{element.id}</p>
          <p>{element.users.length}</p>
          {element.users.length === 4 && <p>Four users in this room</p>}
          <p>{element.users[0].id}</p>
        </div>
      ))}
    </>
  );
};

export default CheckGameRoom;
