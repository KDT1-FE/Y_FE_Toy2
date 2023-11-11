import styled from 'styled-components';
import { useRecoilValue, useRecoilState } from 'recoil';
import {
  accessTokenState,
  privateChatDetail,
  privateChatNew,
} from '../../states/atom';
import { useState, useEffect } from 'react';
import { chatSocket } from '../../api/socket';
import {
  createSeparatedTime,
  sortCreatedAt,
} from '../template/useChattingSort';

interface ChattingDetailProps {
  chatId: string;
}

const ChattingDetail = ({ chatId }: ChattingDetailProps) => {
  const accessToken: any = useRecoilValue(accessTokenState);
  const [postData, setPostData] = useState('');
  const [socket, setSocket] = useState<any>(null);
  const [fetchChat, setFetchChat] = useRecoilState(privateChatDetail);
  const [newChat, setNewChat] = useRecoilState(privateChatNew);

  useEffect(() => {
    try {
      const newSocket = chatSocket(accessToken, chatId);
      setSocket(newSocket);

      newSocket.on('messages-to-client', (messageData) => {
        //console.log('Fetched messages:', messageData.messages);

        // createdAt을 기준으로 시간순서 정렬
        const sortedMessages = sortCreatedAt(messageData.messages);

        // createdAt을 날짜와 시간으로 분리
        const SeparatedTime: any = sortedMessages.map((message) => ({
          ...message,
          ...createSeparatedTime(message.createdAt),
        }));
        setFetchChat(SeparatedTime);
      });

      newSocket.on('message-to-client', (messageObject) => {
        //console.log('Message from server:', messageObject);
        setNewChat((newChat: any) => [
          ...newChat,
          {
            ...messageObject,
            ...createSeparatedTime(messageObject.createdAt),
          },
        ]);
      });

      return () => {
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

  return (
    <>
      <ModalContainer>
        <h1>채팅디테일</h1>
        {fetchChat.map((element, index) => (
          <div key={index}>
            <p>{element.text}</p>
            <p>{element.userId}</p>
            <p>{element.createdAt}</p>
            <p>{element.date}</p>
            <p>{element.time}</p>
          </div>
        ))}

        {newChat.map((element, index) => (
          <div key={index}>
            <p>{element.text}</p>
            <p>{element.userId}</p>
            <p>{element.createdAt}</p>
            <p>{element.date}</p>
            <p>{element.time}</p>
          </div>
        ))}

        <h1>채팅입력</h1>
        <form onSubmit={messageSubmit}>
          <input
            type="text"
            placeholder="Aa"
            value={postData}
            onChange={handleInputChange}
          />
        </form>
      </ModalContainer>
    </>
  );
};

const ModalContainer = styled.div``;

export default ChattingDetail;
