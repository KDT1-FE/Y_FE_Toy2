import { useRecoilState, useRecoilValue } from 'recoil';
import { accessTokenState, allRoomState } from '../../states/atom';
import { getAllGameRooms, participateGameRoom } from '../../api';
import { useNavigate } from 'react-router-dom';
import { getServerSocket } from '../../api/socket';
import { useEffect } from 'react';
const CheckGameRoom = () => {
  const navigate = useNavigate();
  const [allRooms, setAllRooms] = useRecoilState(allRoomState);
  const accessToken: any = useRecoilValue(accessTokenState);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const allRoomsData = await getAllGameRooms(accessToken);
        if (JSON.stringify(allRoomsData.chats) !== JSON.stringify(allRooms)) {
          setAllRooms(allRoomsData.chats);
        }
      } catch (error) {
        console.error('Error retrieving data:', error);
      }
    };
    const serverSocket = getServerSocket();
    serverSocket?.on('new-chat', (messageObject) => {
      console.log(messageObject);
      setAllRooms(messageObject);
    });

    fetchData();

    return () => {
      // Cleanup function (e.g., disconnect socket) if needed
      // This will be called when the component unmounts
    };
  }, [accessToken, setAllRooms, allRooms]); // useEffect dependencies
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
