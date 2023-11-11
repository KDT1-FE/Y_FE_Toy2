import React, { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { accessTokenState, allRoomState } from '../../states/atom';
import { getAllGameRooms, participateGameRoom } from '../../api';
import { useNavigate } from 'react-router-dom';

const CheckGameRoom = () => {
  const navigate = useNavigate();
  const [allRooms, setAllRooms] = useRecoilState(allRoomState);
  const accessToken: any = useRecoilValue(accessTokenState);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allRoomsData = await getAllGameRooms(accessToken);

        if (Array.isArray(allRoomsData?.chats)) {
          setAllRooms(allRoomsData.chats);
        } else {
          console.error('Invalid initial data structure:', allRoomsData?.chats);
        }
      } catch (error) {
        console.error('Error retrieving initial data:', error);
      }
    };

    fetchData();
  }, [accessToken, setAllRooms]);

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
      {Array.isArray(allRooms) &&
        allRooms.map((element, index) => (
          <div
            key={index}
            onClick={() =>
              handleParticipate(element?.users?.length || 0, element?.id)
            }>
            <p>{element?.name}</p>
            <p>{element?.id}</p>
            <p>{element?.users?.length}</p>
            {element?.users?.length === 4 && <p>Four users in this room</p>}
            <p>{element?.users?.[0]?.id}</p>
          </div>
        ))}
    </>
  );
};

export default CheckGameRoom;
