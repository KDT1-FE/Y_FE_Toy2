/* eslint-disable no-console */
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowBack } from '@mui/icons-material';
import { Box, Button } from '@mui/material';
import { AnimatePresence, useCycle } from 'framer-motion';
import toast from 'react-hot-toast';
import { accessTokenState, userState } from '../../atoms';
import { MessageType } from '../../types/MessageType';
import OpenchatMessage from '../../components/openchat/room/OpenchatMessage';
import { User, UserSimple } from '../../types/User';
import OpenchatSender from '../../components/openchat/room/OpenchatSender';
import {
  OpenchatMessageWrap,
  OpenchatRoomAppbar,
} from '../../styles/OpenchatStyle';
import useQueryOpenchatById from '../../hooks/useQueryOpenchatById';
import OpenchatNav from '../../components/openchat/room/OpenchatNav';
import MenuToggle from '../../components/openchat/room/MenuToggle';
import useSocketConnect from '../../hooks/useSocketConnect';
import OpenchatInviteModal from '../../components/openchat/invite/OpenchatInviteModal';
import { searchUsersByName } from '../../utils/filterOpenChats';

function OpenchatRoom() {
  const { chatId = '' } = useParams();
  const navigate = useNavigate();
  const accessToken = useRecoilValue(accessTokenState);
  const socket = useSocketConnect(chatId, accessToken);
  const [message, setMessage] = useState<string>(''); // 내가 입력한 메시지
  const [messages, setMessages] = useState<MessageType[]>([]); // 소켓을 통해 받아온 메시지들
  const userStr = useRecoilValue(userState);
  const user = JSON.parse(userStr) as UserSimple;
  const { isQuering, data, users, allUsers } = useQueryOpenchatById(chatId);
  const [isOpen, toggleOpen] = useCycle(false, true);
  const [open, setOpen] = useState(false);
  // 친구 검색 기능을 위한 state
  const [searchResults, setSearchResults] = useState<User[]>([]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 검색창에 입력하면 이름으로 찾아주는 기능
    const results = searchUsersByName(allUsers, e.target.value.trim());
    setSearchResults(results);
  };

  // const tempMsg = useMemo(
  //   () => [
  //     {
  //       id: 'be47c972-3b35-473c-9c71-2c667b093cf1',
  //       text: '이방은 토이프로젝트 스터디 공부방입니다!',
  //       userId: 'cinderella',
  //       createdAt: '2023-11-13T09:02:51.974Z',
  //     },
  //     {
  //       id: '30063ebf-d20d-4fd3-9461-869261928924',
  //       text: '안녕하세요!',
  //       userId: 'user1',
  //       createdAt: '2023-11-13T15:26:37.515Z',
  //     },
  //     {
  //       id: 'ac2475c0-8254-48ca-9c5d-cca651f0cee4',
  //       text: '테스트중입니다.',
  //       userId: 'user1',
  //       createdAt: '2023-11-13T16:41:47.814Z',
  //     },
  //     {
  //       id: 'ac2475c0-8254-48ca-9c5d-cca651f0cee4',
  //       text: '안녕하세요 반가워요!',
  //       userId: 'cinderella',
  //       createdAt: '2023-11-13T16:42:47.814Z',
  //     },
  //     {
  //       id: 'ac2475c0-8254-48ca-9c5d-cca651f0cee4',
  //       text: 'abcdefghijklmnopqrstuvwxyz',
  //       userId: 'cinderella',
  //       createdAt: '2023-11-13T16:42:54.814Z',
  //     },
  //     {
  //       id: '30063ebf-d20d-4fd3-9461-869261928924',
  //       text: '문자 테스트중 1',
  //       userId: 'user1',
  //       createdAt: '2023-11-13T16:43:37.515Z',
  //     },
  //     {
  //       id: 'ac2475c0-8254-48ca-9c5d-cca651f0cee4',
  //       text: '문자 테스트중 2',
  //       userId: 'user1',
  //       createdAt: '2023-11-13T16:44:47.814Z',
  //     },
  //   ],
  //   [],
  // );

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

  useEffect(() => {
    if (socket) {
      socket.on('message-to-client', (message) => {
        setMessages((prev) => [...prev, message]);
      });
    }
    return () => {
      socket?.off('message-to-client');
    };
  }, [socket?.connected]);

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

  return (
    <Box>
      <MenuToggle isOpen={isOpen} toggle={() => toggleOpen()} />
      <AnimatePresence>
        {isOpen && (
          <OpenchatNav data={data} users={users} handleOpen={handleOpen} />
        )}
      </AnimatePresence>
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
              user={users.find((user) => user.id === message.userId)}
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
      {/* 친구초대 모달 */}
      <OpenchatInviteModal
        open={open}
        handleClose={handleClose}
        handleSearch={handleSearch}
        allUsers={searchResults.length ? searchResults : allUsers}
      />
    </Box>
  );
}

export default OpenchatRoom;
