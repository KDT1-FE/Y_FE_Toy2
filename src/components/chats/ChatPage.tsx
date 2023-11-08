'use client';

import MyChatItem from '@/components/chats/MyChatItem';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import SearchMyChat from '@/components/chats/SearchMyChat';
// svg 가져오기
import AddChat from '../../../public/assets/addChat.svg';
import Search from '../../../public/assets/search.svg';
import { Chat } from './api';
import { instance } from '@/lib/api';

const MyChats = ({ userType }: any) => {
    const [searchOpen, setSearchOpen] = useState(false);
    const [allChats, setAllChats] = useState<Chat[]>([]);

    const getAllChats = async () => {
        try {
            const res = await instance.get<Chat[], any>('chat/all');
            setAllChats(res.chats);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getAllChats();
    }, []);
    // 확인용
    useEffect(() => {
        console.log(allChats);
    }, [allChats]);

    const onSearchHandler = () => {
        setSearchOpen(!searchOpen);
    };
    return (
        <Wrapper>
            <Header>
                <MyChatBar>{userType === 'all' ? '오픈 채팅' : '내 채팅'}</MyChatBar>
                <IconBar>
                    <SearchIcon onClick={onSearchHandler} />
                    <AddChatIcon />
                </IconBar>
            </Header>
            <ChatContainer>
                {searchOpen ? <SearchMyChat /> : null}
                {allChats.map((chat) => (
                    <MyChatItem key={chat.id} name={chat.name} latestMessage={chat.latestMessage} />
                ))}
            </ChatContainer>
        </Wrapper>
    );
};

export default MyChats;

const Wrapper = styled.div`
    width: 100%;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const Header = styled.div`
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
const SearchIcon = styled(Search)`
    cursor: pointer;
`;

const AddChatIcon = styled(AddChat)`
    cursor: pointer;
`;

const ChatContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    margin: 2rem;
`;
