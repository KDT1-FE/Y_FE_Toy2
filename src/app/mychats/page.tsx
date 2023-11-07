'use client';

import MyChatItem from '@/components/mychats/MyChatItem';
import React from 'react';
import styled from 'styled-components';
import { BsSearch } from 'react-icons/bs';
import { BiSolidMessageRoundedAdd } from 'react-icons/bi';
import SearchMyChat from '@/components/mychats/SearchMyChat';

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
                <div>하이</div>
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
const SearchIcon = styled(BsSearch)`
    cursor: pointer;
    width: 26px;
    height: 26px;
`;

const AddChatIcon = styled(BiSolidMessageRoundedAdd)`
    cursor: pointer;
    width: 30px;
    height: 30px;
`;

const ChatContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    margin: 2rem;
`;
