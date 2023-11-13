import React, { ChangeEvent, useEffect, useState, useRef } from 'react';
import { Button, Input } from '@mui/material';
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
import { ChatType } from '../../types/ChatType';

function ChatRoom() {
  const { chatId } = useParams();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<MessageType[]>([]);
  const accessToken = useRecoilValue(accessTokenState);
  const socket = useSocketConnect(chatId, accessToken);
  const name = useGetUserInfo(accessToken);
  const scrollRef = useRef<HTMLUListElement | null>(null);
  const chatList = useChatAll(accessToken);
  const chat: ChatType = chatList.find((chat: ChatType) => chat.id === chatId)!;
  const chatName = chat?.name.split('!@#$$#@!')[1];

  const navigate = useNavigate();

  const moveToChat = () => {
    navigate('/chat');
  };

  // 메시지 작성
  const onChangeMessage = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  // 메시지 보내기
  const submitMessage = () => {
    socket?.emit('message-to-server', message);
    setMessage('');
  };

  const scrollToBottom = () => {
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
        <S.ChatName>{chatName}</S.ChatName>
        <S.EmptyBox />
      </S.Header>
      <S.StyledMessages ref={scrollRef}>
        {messages.length !== 0
          ? messages.map((message, index) => (
              <Message name={name} message={message} key={index} />
            ))
          : ''}
      </S.StyledMessages>

      <S.InputWrapper>
        <S.StyledForm>
          <Input
            sx={{
              width: '100%',
              backgroundColor: 'white',
              borderRadius: '10px',
              outline: 'none',
              p: 2,
            }}
            type="text"
            autoComplete="off"
            onChange={onChangeMessage}
            value={message}
          />
          <Button
            sx={{
              backgroundColor: '#26446d',
              ml: 1,
            }}
            variant="contained"
            endIcon={<Send />}
            onClick={submitMessage}
          >
            Send
          </Button>
        </S.StyledForm>
      </S.InputWrapper>
    </S.Wrapper>
  );
}

export default ChatRoom;
