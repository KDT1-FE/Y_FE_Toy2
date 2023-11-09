import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { accessTokenState, allRoomState } from '../../states/atom';
import { getAllGameRooms, participateGameRoom } from '../../api';
import { useNavigate } from 'react-router-dom';

const POLLING_INTERVAL = 30000;

const CheckGameRoom = () => {
  const navigate = useNavigate();
  const [allRooms, setAllRooms] = useRecoilState(allRoomState);
  const accessToken: any = useRecoilValue(accessTokenState);
  const fetchData = async () => {
    try {
      const allRoomsData = await getAllGameRooms(accessToken);
      setAllRooms(allRoomsData.chats);
    } catch (error) {
      console.error('데이터 가져오기 오류:', error);
    }
  };

  useEffect(() => {
    fetchData();
    const pollingId = setInterval(() => {
      fetchData();
    }, POLLING_INTERVAL);
    return () => {
      clearInterval(pollingId);
    };
  }, [fetchData, setAllRooms]);

  if (allRooms.length === 0) {
    return <div>No rooms available or an error occurred.</div>;
  }

  const handleParticipate = async (numberOfPeople: number, chatId: any) => {
    if (numberOfPeople === 4) {
      alert('방이 꽉 찼어요.');
    } else {
      await participateGameRoom(chatId, accessToken);
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
