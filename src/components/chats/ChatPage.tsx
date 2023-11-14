'use client';
// react 관련 import
import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';
// styled import
import styled from 'styled-components';
// chats 컴포넌트 import
import MyChatItem from '@/components/chats/MyChatItem';
import SearchMyChat from '@/components/chats/SearchMyChat';
// svgr import
import AddChat from '../../../public/assets/addChat.svg';
import { Chat, searchChatsState, searchInputState } from './chatsStore';
import { useRouter } from 'next/navigation';
import { sortTime } from './useFormatCreatedAt';

import { getMyChats, getAllChats, partChats } from './getChats';
import { useQuery } from '@tanstack/react-query';
const MyChats = ({ userType }: { userType: string }) => {
  const [addChatOpen, setAddChatOpen] = useState(false);
  // 검색창에 입력 중에 올바른 검색어 비교 위해 Input 값 전역 상태 관리
  const filterInputValue = useRecoilValue(searchInputState);
  const filterChats = useRecoilValue(searchChatsState);

  const router = useRouter();
  const userId = typeof window !== 'undefined' ? sessionStorage.getItem('userId') : null;

  // 채팅방 들어갈 때 새 유저면 채팅방에 새로 참여시키고 기존 유저는 그냥 들어가기
  const enterChatRoom = (chat: Chat) => {
    if (chat.id && chat.users) {
      if (chat.users.every((user) => user.id !== userId)) {
        partChats(chat.id);
        router.push(`/chating/${chat.id}`);
        console.log('새로 입장 성공');
      } else {
        router.push(`/chating/${chat.id}`);
        console.log('기존 유저 들어가기 성공');
      }
    }
  };

  // react-query로 조건부 fetch
  const { data, isLoading } = useQuery<Chat[]>({
    queryKey: ['getChatsKey'],
    queryFn: userType === 'my' ? getMyChats : getAllChats,
    refetchOnWindowFocus: false,
    refetchInterval: 1000,
  });

  if (isLoading) {
    return <Loading />;
  }

  const onAddHandler = () => {
    setAddChatOpen(!addChatOpen);
  };

  return (
    <Wrapper>
      <ChatHeader>
        <MyChatBar>{userType === 'all' ? '오픈 채팅' : '내 채팅'}</MyChatBar>
        <IconBar>
          <AddChatIcon onClick={onAddHandler} />
        </IconBar>
      </ChatHeader>
      <ChatContainer>
        <SearchMyChat userType={userType} />
        <ChatList>
          {userId && data ? (
            filterInputValue ? (
              filterChats.length > 0 ? (
                sortTime(filterChats).map((chat) => (
                  <MyChatItem
                    key={chat.id}
                    name={chat.name}
                    latestMessage={chat.latestMessage}
                    users={chat.users}
                    onClick={() => enterChatRoom(chat)}
                    isPrivate={chat.isPrivate}
                  />
                ))
              ) : (
                <NoUserWrap>
                  <NoUserText>해당 사용자가 존재하지 않습니다.</NoUserText>
                </NoUserWrap>
              )
            ) : (
              sortTime(data).map((chat) => (
                <MyChatItem
                  key={chat.id}
                  name={chat.name}
                  latestMessage={chat.latestMessage}
                  users={chat.users}
                  onClick={() => enterChatRoom(chat)}
                  isPrivate={chat.isPrivate}
                />
              ))
            )
          ) : null}
        </ChatList>
      </ChatContainer>
    </Wrapper>
  );
};

export default MyChats;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const ChatHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 4rem 2rem 1rem;
`;

const MyChatBar = styled.div`
  color: #00956e;
  font-weight: bold;
  font-size: 1.5rem;
`;
const IconBar = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-top: 0.6rem;
`;

const AddChatIcon = styled(AddChat)`
  position: relative;
  cursor: pointer;
`;

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  margin: 2rem;
  background-color: transparent;
  height: calc(50rem - 7rem);
`;

const ChatList = styled.div`
  overflow-y: auto;
  &::-webkit-scrollbar {
    /*크롬, 사파리, 오페라, 엣지*/
    display: none;
  }
  -ms-overflow-style: none; /* ie */
  scrollbar-width: none; /* 파이어폭스 */
`;

const Loading = styled.div`
  width: 50px;
  height: 50px;

  border: 5.5px solid rgba(255, 255, 255, 0.3);
  border-top: 5.5px solid ${({ theme }) => theme.color.mainGreen};
  border-radius: 50%;

  animation: spin 1s linear infinite;

  margin: 20rem auto 0;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const NoUserWrap = styled.div`
  text-align: center;

  margin-top: 8rem;

  display: flex;
  flex-direction: column;
  gap: 3rem;
`;

const NoUserText = styled.h2`
  color: ${({ theme }) => theme.color.darkGreen};
  font-size: ${({ theme }) => theme.fontSize.xl};
`;
