/* eslint-disable no-console */
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowBack } from '@mui/icons-material';
import { Box, Button } from '@mui/material';
import { AnimatePresence, useCycle } from 'framer-motion';
import { accessTokenState, userState } from '../../atoms';
import { MessageType } from '../../types/MessageType';
import OpenchatMessage from '../../components/openchat/OpenchatMessage';
import { UserSimple } from '../../types/User';
import OpenchatSender from '../../components/openchat/OpenchatSender';
import {
  OpenchatMessageWrap,
  OpenchatRoomAppbar,
} from '../../styles/OpenchatStyle';
import useQueryOpenchatById from '../../hooks/useQueryOpenchatById';
import OpenchatNav from '../../components/openchat/OpenchatNav';
import MenuToggle from '../../components/openchat/MenuToggle';
import useSocket from '../../hooks/useSocket';

function OpenchatRoom() {
  const { chatId = '' } = useParams();
  const navigate = useNavigate();
  const { isConnected, socket } = useSocket();
  const [message, setMessage] = useState<string>('');
  const [messages, setMessages] = useState<MessageType[]>([]);
  const userStr = useRecoilValue(userState);
  const user = JSON.parse(userStr) as UserSimple;

  // const socket = useSocketConnect(chatId, accessToken);
  const { isQuering, data } = useQueryOpenchatById(chatId);
  const [isOpen, toggleOpen] = useCycle(false, true);

  // const tempMsg = useMemo(
  //   () => [
  //     {
  //       id: 'be47c972-3b35-473c-9c71-2c667b093cf1',
  //       text: '이방은 토이프로젝트 스터디 공부방입니다!',
  //       userId: 'cinderella',
  //       createdAt: '2023-11-13T09:02:51.974Z',
  //     },
  //     {
  //       id: 'be47c972-3b35-473c-9c71-2c667b093cf1',
  //       text: '안녕하세요!',
  //       userId: 'user1',
  //       createdAt: '2023-11-13T09:03:00.974Z',
  //     },
  //   ],
  //   [],
  // );

  const submitMessage = useCallback(() => {
    socket?.emit('message-to-server', message);
    setMessage('');
  }, [message]);

  const onChangeMessage = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setMessage(e.target.value);
    },
    [message],
  );

  // 날짜를 기준으로 정렬하는 함수
  const sortByDate = (a: MessageType, b: MessageType): number => {
    const aDate = new Date(a.createdAt);
    const bDate = new Date(b.createdAt);
    return aDate.getTime() - bDate.getTime();
  };

  useEffect(
    () =>
      // no-op if the socket is already connected

      () => {
        if (socket) {
          socket.disconnect();
        }
      },
    [],
  );

  useEffect(() => {
    // 메시지를 가져오는 이벤트 emit
    if (socket && isConnected) {
      socket?.emit('fetch-messages');
      // 이전 메시지들 가져오기
      socket?.on('messages-to-client', (data) => {
        setMessages([...data.messages]);
      });
      // 메시지 보냈을때 내 메시지 가져오기
      socket?.on('message-to-client', (message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
      });
    }

    return () => {
      socket?.off('messages-to-client');
      socket?.off('message-to-client');
    };
  }, [socket, isConnected]);

  return (
    <div>
      <MenuToggle isOpen={isOpen} toggle={() => toggleOpen()} />
      <AnimatePresence>{isOpen && <OpenchatNav />}</AnimatePresence>
      <OpenchatMessageWrap
        sx={{
          backgroundColor: 'grey.100',
        }}
      >
        <OpenchatRoomAppbar>
          <div className="openchat__room-appbar-wrap">
            <Button
              onClick={() => {
                navigate('/open');
              }}
            >
              <ArrowBack />
            </Button>
            <p>{isQuering || data?.name}</p>
          </div>
        </OpenchatRoomAppbar>
        <Box px={4} sx={{ display: 'flex', flexDirection: 'column' }}>
          {messages.sort(sortByDate).map((message) => (
            <OpenchatMessage
              key={message.createdAt}
              isMe={message.userId === user.id}
              msg={message}
            />
          ))}
        </Box>
      </OpenchatMessageWrap>
      {!isOpen && (
        <OpenchatSender
          message={message}
          onChange={onChangeMessage}
          onClick={submitMessage}
        />
      )}
    </div>
  );
}

export default OpenchatRoom;
