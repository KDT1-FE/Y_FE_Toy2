import React, { useEffect, useState, useRef } from 'react';
import { Send, ArrowBack } from '@mui/icons-material';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import Message from '../../components/chat/Message';
import * as S from '../../styles/chat/ChatRoomStyles';
import { MessageType } from '../../types/MessageType';
import { accessTokenState } from '../../atoms';
import useSocketConnect from '../../hooks/useSocketConnect';
import useGetUserInfo from '../../hooks/useGetUserInfo';
import useChatAll from '../../hooks/useChatAll';
import useUserAll from '../../hooks/useUserAll';
import { ChatType } from '../../types/ChatType';

function ChatRoom() {
  const navigate = useNavigate();
  const { chatId } = useParams();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<MessageType[]>([]);
  const accessToken = useRecoilValue(accessTokenState);
  const socket = useSocketConnect(chatId, accessToken);
  const userInfo = useGetUserInfo(accessToken);
  const users = useUserAll(accessToken);
  const scrollRef = useRef<HTMLUListElement | null>(null);
  const chatList = useChatAll(accessToken);
  const chat: ChatType = chatList.find((chat: ChatType) => chat.id === chatId)!;
  let chatPartner;

  if (chat) {
    chatPartner = chat.users.find((user) => user.id !== userInfo?.id);
  }

  const moveToChat = (): void => {
    navigate('/chat');
  };

  const onChangeMessage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const submitMessage = (): void => {
    if (message.trim()) {
      socket?.emit('message-to-server', message);
      setMessage('');
    }
  };

  const handleSubmit = (e: React.KeyboardEvent<HTMLFormElement>): void => {
    e.preventDefault();
    submitMessage();
  };

  const scrollToBottom = (): void => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    socket?.on('message-to-client', (message: MessageType) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket?.off('message-to-client');
    };
  }, [socket]);

  useEffect(() => {
    if (socket) {
      socket.emit('fetch-messages');

      socket.on('messages-to-client', (messagesObject) => {
        setMessages(messagesObject.messages);
      });
    }

    return () => {
      socket?.off('messages-to-client');
    };
  }, [socket?.connected]);

  return (
    <S.Wrapper>
      <S.Header>
        <S.BackBtn onClick={moveToChat}>
          <ArrowBack />
        </S.BackBtn>
        <S.ChatName>{chatPartner?.username}</S.ChatName>
        <S.EmptyBox />
      </S.Header>
      <S.StyledMessages ref={scrollRef}>
        {messages.length !== 0
          ? messages.map((message, index) => (
              <Message
                userInfo={userInfo}
                users={users}
                messages={messages}
                message={message}
                key={index}
              />
            ))
          : ''}
      </S.StyledMessages>

      <S.InputWrapper>
        <S.StyledForm onSubmit={handleSubmit}>
          <S.StyledInput
            type="text"
            autoComplete="off"
            onChange={onChangeMessage}
            value={message}
          />
          <S.SendBtn
            variant="contained"
            endIcon={<Send />}
            onClick={submitMessage}
          >
            Send
          </S.SendBtn>
        </S.StyledForm>
      </S.InputWrapper>
    </S.Wrapper>
  );
}

export default ChatRoom;
