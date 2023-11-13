'use client';
// react 관련 import
import React, { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
// styled import
import styled from 'styled-components';
// chats 컴포넌트 import
import MyChatItem from '@/components/chats/MyChatItem';
import SearchMyChat from '@/components/chats/SearchMyChat';
// svgr import
import AddChat from '../../../public/assets/addChat.svg';
import { Chat, allChatsState, myChatsState, searchChatsState } from './chatsStore';
import { instance } from '@/lib/api';
import { useRouter } from 'next/navigation';
import { sortTime } from './useFormatCreatedAt';

import { getMyChats, getAllChats } from './getChats';
import { useQuery } from '@tanstack/react-query';
const MyChats = ({ userType }: any) => {
    const [addChatOpen, setAddChatOpen] = useState(false);
    const filterChats = useRecoilValue(searchChatsState);
    const router = useRouter();
    const userId = typeof window !== 'undefined' ? sessionStorage.getItem('userId') : null;

    const enterChatRoom = (chat: Chat) => {
        if (chat.id && chat.users) {
            router.push(`/chating/${chat.id}`);
        }
    };
    const { data, isLoading } = useQuery<Chat[], any>({
        queryKey: ['getChatsKey'],
        queryFn: userType === 'my' ? getMyChats : getAllChats,
        refetchOnWindowFocus: false,
        staleTime: 10000,
    });

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
                    {userId && data
                        ? filterChats.length > 0
                            ? sortTime(filterChats).map((chat) => (
                                  <MyChatItem
                                      key={chat.id}
                                      name={chat.name}
                                      latestMessage={chat.latestMessage}
                                      users={chat.users}
                                      onClick={() => enterChatRoom(chat)}
                                      isPrivate={chat.isPrivate}
                                  />
                              ))
                            : sortTime(data).map((chat) => (
                                  <MyChatItem
                                      key={chat.id}
                                      name={chat.name}
                                      latestMessage={chat.latestMessage}
                                      users={chat.users}
                                      onClick={() => enterChatRoom(chat)}
                                      isPrivate={chat.isPrivate}
                                  />
                              ))
                        : null}
                </ChatList>
            </ChatContainer>
        </Wrapper>
    );
};

export default MyChats;

export const Wrapper = styled.div`
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
`;

const ChatList = styled.div`
    overflow-y: auto;
    height: 50rem;
    &::-webkit-scrollbar {
        /*크롬, 사파리, 오페라, 엣지*/
        display: none;
    }
    -ms-overflow-style: none; /* ie */
    scrollbar-width: none; /* 파이어폭스 */
`;
