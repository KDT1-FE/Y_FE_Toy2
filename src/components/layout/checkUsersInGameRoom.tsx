import React, { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { onlineUserStateInGameRoom } from '../../states/atom';
import { io } from 'socket.io-client';
import { SERVER_URL, SERVER_ID } from '../../constant';
import { getUserData } from '../../api';
import UserProfile from '../template/userProfile';

interface ChattingDetailProps {
  chatId: string;
}

type ResponseValue = {
  user: User;
};

interface User {
  id: string;
  name: string;
  picture: string;
}

const CheckUsersInGameRoom: React.FC<ChattingDetailProps> = ({ chatId }) => {
  const [UsersInGameRoom, setUsersInGameRoom] = useRecoilState<string[]>(
    onlineUserStateInGameRoom,
  );
  const [profiles, setProfiles] = useState<ResponseValue[]>([]);

  useEffect(() => {
    try {
      const socket = io(`${SERVER_URL}chat?chatId=${chatId}`, {
        extraHeaders: {
          serverId: SERVER_ID,
        },
      });

      socket.on('connect', () => {
        socket?.emit('users');
      });

      socket.on('users-to-client', (data) => {
        setUsersInGameRoom(data.users);
      });

      socket.on('join', (data) => {
        console.log(data);
        // setTimeout(() => {
        setUsersInGameRoom(data.users);
        // }, 5000);
      });

      socket.on('leave', (data) => {
        console.log(data);
        setUsersInGameRoom(data.users);
      });
    } catch (error) {
      console.error('Error retrieving data:', error);
    }
  }, [chatId]);
  useEffect(() => {
    const fetchUserProfiles = async () => {
      const profilesArray: ResponseValue[] = [];
      // console.log(UsersInGameRoom);
      for (const userId of UsersInGameRoom) {
        // console.log(userId);
        // if (userId.substring(0, 8) === '090b4ff4') {
        //   console.log(userId.substring(0, 9));
        //   const id = userId.substring(9);
        //   try {
        //     const res = await getUserData(id);
        //     profilesArray.push(res);
        //   } catch (error) {
        //     console.error('Error fetching user data:', error);
        //   }
        // } else {
        try {
          const res = await getUserData(userId);
          profilesArray.push(res);
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
        // }
      }

      setProfiles(profilesArray);
    };

    fetchUserProfiles();
  }, [UsersInGameRoom, setProfiles]);
  console.log(profiles);
  return (
    <>
      {profiles.map((element, index) => (
        <div key={index}>
          <UserProfile />
          <p>{element.user.id}</p>
          <p>{element.user.name}</p>
          <p>{element.user.picture}</p>
        </div>
      ))}
    </>
  );
};

export default CheckUsersInGameRoom;
