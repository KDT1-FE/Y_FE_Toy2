import axios from "axios";
import { io } from "socket.io-client";

interface User {
  id: string;
  username: string;
  picture: string;
}

export interface ChatI {
  id: string;
  name: string;
  users: User[];
  isPrivate: boolean;
  updatedAt: string;
  latestMessage: string | null;
}

const token = sessionStorage.getItem('token');

// 모든 유저 조회
export const fetchChatUsers = async () => {
  try {
    const response = await axios.get('https://fastcampus-chat.net/users', {
      headers: {
        'Authorization': `Bearer ${token}`,
        serverId: '1601075b',
      }
    });
    console.log('모든 유저 조회', response.data);
  } catch (error) {
    console.error(error);
  }
};

// 채팅 생성하기
// TODO : name, users 데이터 받아야함
export const postChat = async () => {
  try {
    const response = await axios.post('https://fastcampus-chat.net/chat', {
      name: '진욱님 초대해서 방 생성',
      users: ['leejin7900']
    }, {
      headers: {
        'Authorization': `Bearer ${token}`,
        serverId: '1601075b',
      }
    });
    console.log('채팅방 최초 생성하기', response.data);
  } catch (error) {
    console.error(error);
  }
};

// 모든 채팅방 조회
export const fetchMyRoom = async () => {
  try {
    const response = await axios.get('https://fastcampus-chat.net/chat', {
      headers: {
        'Authorization': `Bearer ${token}`,
        serverId: '1601075b',
      }
    });

    const roomData = response.data
    return roomData;
  } catch (error) {
    console.error(error);
  }
};


// 채팅방 나가기
// export const leaveMyRoom = async () => {
//   try {
//     const response = await axios.patch('https://fastcampus-chat.net/chat/leave', {
//       "chatId": ""475799d4-70d3-4cc8-95df-4b7ecad66787"
//     }, {
//       headers: {
//         'Authorization': `Bearer ${token}`,
//         serverId: '1601075b',
//       },
//     });
//     console.log('내가 속한 채팅방 조회', response.data);
//   } catch (error) {
//     console.error(error);
//   }
// };