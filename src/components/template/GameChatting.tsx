import styled from 'styled-components';
import InfoImg from '../../assets/icons/info.png';
import AaImg from '../../assets/icons/Aa.png';
import sendImg from '../../assets/icons/send.png';
import { useEffect, useState } from 'react';
import { chatSocket } from '../../api/socket';
import {
  sortCreatedAt,
  createSeparatedTime,
  modifyDate,
} from './useChattingSort';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  privateChatDetail,
  privateChatNew,
  myUserDataState,
  onlineUserStateInGameRoom,
} from '../../states/atom';
import { getCookie } from '../../util/util';

interface ChattingDetailProps {
  chatId: string;
}

const GameChatting = ({ chatId }: ChattingDetailProps) => {
  console.log(chatId);
  const [postData, setPostData] = useState('');
  const [socket, setSocket] = useState<any>(null);
  const [fetchChat, setFetchChat] = useRecoilState(privateChatDetail);
  const [newChat, setNewChat] = useRecoilState(privateChatNew);
  const [__, setUsersInGameRoom] = useRecoilState<string[]>(
    onlineUserStateInGameRoom,
  );
  const [lastDate, setLastDate] = useState<string | undefined>('');
  const accessToken: any = getCookie('accessToken');
  const myUserData: any = useRecoilValue(myUserDataState);
  useEffect(() => {
    try {
      const newSocket = chatSocket(accessToken, chatId);
      setSocket(newSocket);

      newSocket.on('messages-to-client', (messageData) => {
        console.log('Fetched messages:', messageData.messages);

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
        console.log(messageObject);
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
        socket.emit('users');
      });

      newSocket.on('users-to-client', (data) => {
        setUsersInGameRoom(data.users);
      });

      newSocket.on('join', (data) => {
        console.log('들어온거 작동');
        setUsersInGameRoom(data.users);
      });

      newSocket.on('leave', (data) => {
        console.log('나간거 작동');
        setUsersInGameRoom(data.users);
      });

      return () => {
        setNewChat([]);
        newSocket.disconnect();
      };
    } catch (error) {
      console.error('Error retrieving data:', error);
    }
  }, [chatId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPostData(e.target.value);
  };

  const messageSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    socket.emit('message-to-server', postData);
    setPostData('');
  };

  return (
    <Chat>
      <ChatHeader>
        <ChatHeaderIcon src={InfoImg} alt="ChatInfo" />
        <ChatHeaderWarn>게임이 시작되었습니다.</ChatHeaderWarn>
      </ChatHeader>
      {/* 채팅 부분 */}
      {fetchChat.map((element, index) => (
        <div key={index}>
          <p>{element.date}</p>
          <div id="messageWrap">
            <div
              id="message"
              className={element.userId === myUserData.id ? 'mine' : ''}>
              <p style={{ color: 'red' }}>{element.text}</p>
            </div>
            <p>{element.time}</p>
          </div>
        </div>
      ))}

      {newChat.map((element, index) => (
        <div key={index}>
          {element.date !== lastDate && <p>{element.date}</p>}

          <div id="messageWrap">
            <div
              id="message"
              className={element.userId === myUserData.id ? 'mine' : ''}>
              {/* {"mine이면 파란색, ''이면 빨간색"} */}
              <p>{element.text}</p>
            </div>
            <p>{element.time}</p>
          </div>
        </div>
      ))}
      <SendChat>
        <form onSubmit={messageSubmit}>
          <input
            type="text"
            placeholder="Aa"
            value={postData}
            onChange={handleInputChange}
          />
        </form>
        <Aa src={AaImg} alt="Aa" />
        <Sending src={sendImg} alt="send" />
      </SendChat>
    </Chat>
  );
};

const Chat = styled.div`
  width: 370px;
  height: 450px;
  background-color: #fff;
  border-radius: 15px;
  text-align: center;
  box-shadow: 0px 3px 5px 0px #e2e8f0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  /* 챗부분 넣으면 자식들 height를 퍼센트로.. */
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
  top: 12px;
  left: 130px;
  color: #fff;
`;

const SendChat = styled.div`
  position: relative;
`;

const ChatInput = styled.form`
  width: 100%;
  height: 50px;
  background-color: #f7fafc;
  border-radius: 0 0 15px 15px;
  border-top: 1px solid #e2e8f0;
  padding: 0 60px;
  color: #2d3748;

  &:focus {
    outline: none;
  }
`;

const Aa = styled.img`
  position: absolute;
  top: 20px;
  left: 20px;
`;

const Sending = styled.img`
  position: absolute;
  top: 8px;
  right: 10px;
  width: 30px;
  height: 30px;
`;

export default GameChatting;
