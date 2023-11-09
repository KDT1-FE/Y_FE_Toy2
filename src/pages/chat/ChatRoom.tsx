import React, { ChangeEvent, useEffect, useState, useCallback, useRef, LegacyRef } from 'react';
import { Button, Input } from '@mui/material';
import { Send } from '@mui/icons-material';
import { useParams } from 'react-router-dom';
import { Socket, io } from 'socket.io-client';
import { useRecoilValue } from 'recoil';
import Message from '../../components/chat/Message';
import { accessTokenState } from '../../atoms';
import * as S from '../../styles/chat/ChatRoomStyles';
import { MessageType } from '../../types/MessageType';

function ChatRoom() {
  const { chatId } = useParams();
  const [socketState, setSocketState] = useState<Socket | null>(null);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<MessageType[]>([]);
  const accessToken = useRecoilValue(accessTokenState);
  const scrollRef = useRef<HTMLUListElement | null>(null);

  const socketConnect = useCallback(async () => {
    const socket = io(`https://fastcampus-chat.net/chat?chatId=${chatId}`, {
      extraHeaders: {
        serverId: '9b9a6496',
        Authorization: `Bearer ${accessToken}`,
      },
    });

    setSocketState(socket);
  }, [chatId, accessToken]);

  const userFetch = useCallback(async () => {
    const response = await fetch('https://fastcampus-chat.net/auth/me', {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        serverId: '9b9a6496',
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const data = await response.json();

    setName(data.user.name);
  }, [accessToken]);

  // 메시지 작성
  const onChangeMessage = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  // 메시지 보내기
  const submitMessage = () => {
    socketState?.emit('message-to-server', message);
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
    socketState?.emit('fetch-messages');

    socketState?.on('messages-to-client', (data) => {
      setMessages([...data.messages].reverse());
    });
  }, [socketState]);

  useEffect(() => {
    userFetch();
  }, [userFetch]);

  useEffect(() => {
    socketConnect();
  }, [socketConnect]);

  useEffect(() => {
    socketState?.on('message-to-client', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socketState?.off('message-to-client');
    };
  }, [socketState]);

  return (
    <S.Wrapper>
      <S.StyledMessages ref={scrollRef}>
        {messages.length !== 0
          ? messages.map((message, index) => <Message name={name} message={message} key={index} />)
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
