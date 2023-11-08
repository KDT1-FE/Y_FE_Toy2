import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { allRoomState } from '../../states/atom';
import { getAllGameRooms, participateGameRoom } from '../../api';
import { useNavigate } from 'react-router-dom';

const CheckGameRoom = () => {
  const token: any = localStorage.getItem('jwt');
  const navigate = useNavigate();
  const [allRooms, setAllRooms] = useRecoilState(allRoomState);
  const fetchData = async () => {
    try {
      const allRoomsData = await getAllGameRooms(token);
      setAllRooms(allRoomsData.chats);
    } catch (error) {
      console.error('데이터 가져오기 오류:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [allRooms.length]);

  if (allRooms.length === 0) {
    return <div>No rooms available or an error occurred.</div>;
  }

  const handleParticipate = async (numberOfPeople: number, chatId: any) => {
    if (numberOfPeople === 4) {
      alert('방이 꽉 찼어요.');
    } else {
      await participateGameRoom(chatId, token);
      navigate(`/room/${chatId}`);
    }
  };

  return (
    <>
      <button onClick={fetchData}>Refresh Data</button>
      {allRooms.map((element, index) => (
        <div
          key={index}
          onClick={() => handleParticipate(element.users.length, element.id)}>
          {element.name}
          <div>{element.users.length}</div>
          {element.users.length === 4 && <div>Four users in this room</div>}
          <div>{element.users[0].id}</div>
        </div>
      ))}
    </>
  );
};

export default CheckGameRoom;
