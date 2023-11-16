import styled from 'styled-components';
import InfoImg from '../../assets/icons/info.png';
import sendImg from '../../assets/icons/send.png';
import { useEffect, useRef, useState } from 'react';
import { chatSocket } from '../../api/socket';
import {
  sortCreatedAt,
  createSeparatedTime,
  modifyDate,
} from './useChattingSort';
import { useRecoilState, useSetRecoilState } from 'recoil';

import {
  privateChatDetail,
  privateChatNew,
  onlineUserStateInGameRoom,
  myMessageState,
  roomIdState,
  usersInRoom,
} from '../../states/atom';
import { getCookie } from '../../util/util';

interface ChattingDetailProps {
  chatId: string;
}

interface ChatsProps {
  $mine: boolean; // 이 부분이 추가되었습니다.
}

const GameChatting = ({ chatId }: ChattingDetailProps) => {
  const [postData, setPostData] = useState('');
  const [socket, setSocket] = useState<any>(null);
  const [fetchChat, setFetchChat] = useRecoilState(privateChatDetail);
  const [newChat, setNewChat] = useRecoilState(privateChatNew);
  const setUsersInGameRoom = useSetRecoilState(onlineUserStateInGameRoom);
  const [lastDate, setLastDate] = useState<string | undefined>('');
  const [usersInRoomData, setUsersInRoom] = useRecoilState(usersInRoom);
  const accessToken: any = getCookie('accessToken');

  function getUserIdFromCookie() {
    // 쿠키 문자열을 세미콜론으로 분할하여 개별 쿠키를 배열로 변환
    const cookies = document.cookie.split(';');

    // 각 쿠키를 순회하며 'userId' 쿠키 찾기
    for (let cookie of cookies) {
      // 쿠키 문자열에서 공백 제거
      const trimmedCookie = cookie.trim();

      // 'userId' 쿠키 이름으로 시작하는지 확인
      if (trimmedCookie.startsWith('userId=')) {
        // '=' 문자를 기준으로 쿠키 이름과 값을 분리
        const value = trimmedCookie.split('=')[1];

        // userId 값 반환
        return value;
      }
    }

    // 'userId' 쿠키가 없는 경우 undefined 반환
    return undefined;
  }

  const userId = getUserIdFromCookie();
  //console.log(userId);
  // const myUserData: any = useRecoilValue(myUserDataState);
  const [currentMessageObject, setCurrentMessageObject] =
    useRecoilState(myMessageState);

  useEffect(() => {
    try {
      const newSocket = chatSocket(accessToken, chatId);
      setSocket(newSocket);

      newSocket.on('messages-to-client', (messageData) => {
        // console.log('Fetched messages:', messageData.messages);

        // createdAt을 기준으로 시간순서 정렬
        const sortedMessages = sortCreatedAt(messageData.messages);

        // createdAt을 날짜와 시간으로 분리
        const SeparatedTime: any = sortedMessages.map((message) => ({
          ...message,
          ...createSeparatedTime(message.createdAt),
        }));

        // 마지막 날짜 저장
        setLastDate(SeparatedTime[SeparatedTime.length - 1]?.date);

        // 중복 날짜, 시간 null로 반환
        const modifyDateArray = modifyDate(SeparatedTime);

        setFetchChat(modifyDateArray);
      });

      newSocket.on('message-to-client', (messageObject) => {
        setCurrentMessageObject([
          ...currentMessageObject,
          {
            text: messageObject.text,
            userId: messageObject.userId,
            chatId: chatId,
          },
        ]);
        setNewChat((newChat: any) => {
          // 중복 날짜, 시간 null로 반환
          const modifyDateArray = modifyDate([
            ...newChat,
            {
              ...messageObject,
              ...createSeparatedTime(messageObject.createdAt),
            },
          ]);
          return modifyDateArray;
        });
      });

      // 게임방 유저 목록 소켓 연결
      newSocket.on('connect', () => {
        newSocket.emit('users');
      });

      newSocket.on('users-to-client', (data) => {
        setUsersInGameRoom(data.users);
      });

      newSocket.on('join', (data) => {
        console.log('들어온거 작동');
        setUsersInGameRoom(data.users);
        setUsersInRoom(usersInRoomData + 1);
      });

      newSocket.on('leave', (data) => {
        console.log('나간거 작동');
        setUsersInGameRoom(data.users);
        if (usersInRoomData > 0) {
          setUsersInRoom(usersInRoomData - 1);
        }
      });

      return () => {
        setNewChat([]);
        setUsersInGameRoom([]);
        newSocket.disconnect();
      };
    } catch (error) {
      console.error('Error retrieving data:', error);
    }
  }, [accessToken, chatId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPostData(e.target.value);
  };

  const messageSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    socket.emit('message-to-server', postData);
    setPostData('');
  };

  const chatContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    const chatContainer = chatContainerRef.current;
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [fetchChat, newChat]);

  return (
    <Chat>
      <ChatHeader>
        <ChatHeaderWarn>1조 짱짱맨ㅋ</ChatHeaderWarn>
      </ChatHeader>
      <Chatting ref={chatContainerRef}>
        {/* 이전 채팅 불러오기 */}
        {fetchChat.map((element, index) => (
          <div key={index}>
            <p>{element.date}</p>
            <ChatWrap $mine={element.userId === userId}>
              <ChatName>{element.userId}</ChatName>
              <Chats $mine={element.userId === userId}>
                <p>{element.text}</p>
                <ChatTime $mine={element.userId === userId}>
                  {element.time}
                </ChatTime>
              </Chats>
            </ChatWrap>
          </div>
        ))}

        {/* 현재 채팅 */}
        {newChat.map((element, index) => (
          <div key={index}>
            {element.date !== lastDate && <p>{element.date}</p>}

            <ChatWrap $mine={element.userId === userId} id="messageWrap">
              <ChatName>{element.userId}</ChatName>
              <Chats $mine={element.userId === userId}>
                <p>{element.text}</p>

                <ChatTime $mine={element.userId === userId}>
                  {element.time}
                </ChatTime>
              </Chats>
            </ChatWrap>
          </div>
        ))}
      </Chatting>
      <SendChat>
        <form onSubmit={messageSubmit}>
          <SendInput
            type="text"
            placeholder="Aa"
            value={postData}
            onChange={handleInputChange}
          />
          <SendBtn>
            <Sending src={sendImg} alt="send" />
          </SendBtn>
        </form>
      </SendChat>
    </Chat>
  );
};

const Chat = styled.div`
  width: 450px;
  height: 563px;
  background-color: #fff;
  border-radius: 15px;
  text-align: center;
  box-shadow: 0px 3px 5px 0px #e2e8f0;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
`;

const ChatHeader = styled.div`
  width: 100%;
  height: 50px;
  background-image: linear-gradient(90deg, #313860 20%, #151928 80%);
  border-radius: 15px 15px 0 0;
  position: relative;
`;

const ChatHeaderIcon = styled.img`
  position: absolute;
  top: 11px;
  left: 96px;
`;

const ChatHeaderWarn = styled.div`
  position: absolute;
  font-size: 18px;
  font-weight: 600;
  top: 12px;
  left: 180px;
  color: #fff;
`;

const SendChat = styled.div`
  position: relative;
`;

const Chatting = styled.div`
  width: 450px;
  height: 463px;
  margin: 0 auto;
  background-color: #fff;
  overflow-y: scroll;
  padding: 20px;
`;

const ChatWrap = styled.div<ChatsProps>`
  width: 100%;
  text-align: ${(props) => (props.$mine ? 'right' : 'left')};
  position: relative;
`;

const ChatName = styled.div`
  font-size: 16px;
  margin: 0 5px;
`;

const Chats = styled.div<ChatsProps>`
  max-width: 260px;
  padding: 8px 12px;
  border-radius: 10px;
  color: white;
  font-size: 14px;

  background-color: ${(props) => (props.$mine ? '#4FD1C5' : '#EDF2F7')};
  color: ${(props) => (props.$mine ? '#fff' : '#2D3748')};
  margin-bottom: 10px;
  display: inline-block;
  text-align: ${(props) => (props.$mine ? 'right' : 'left')};
`;

const ChatTime = styled.div<ChatsProps>`
  font-size: 10px;
  color: ${(props) =>
    props.$mine ? 'rgba(255, 255, 255, 0.7)' : 'rgba(45,55,72, 0.7)'};
`;

const SendInput = styled.input`
  padding-left: 25px;
  width: 450px;
  height: 50px;
  border: 1px solid #e2e8f0;
  border-radius: 0 0 10px 10px;

  &:focus {
    border-color: #c2c5ca;
    outline: none;
  }
`;

const SendBtn = styled.button``;

const Sending = styled.img`
  position: absolute;
  top: 8px;
  right: 10px;
  width: 30px;
  height: 30px;
`;

export default GameChatting;
