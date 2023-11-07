'use client';

import MyChatItem from '@/components/mychats/MyChatItem';
import React from 'react';
import styled from 'styled-components';
import SearchMyChat from '@/components/mychats/SearchMyChat';
// svg 가져오기
import AddChat from '../../../public/assets/addChat.svg';
import Search from '../../../public/assets/search.svg';
const MyChats = () => {
    return (
        <Wrapper>
            <Header>
                <MyChatBar>내 채팅</MyChatBar>
                <IconBar>
                    <SearchIcon />
                    <AddChatIcon />
                </IconBar>
            </Header>
            <ChatContainer>
                <SearchMyChat />
                <MyChatItem />
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
