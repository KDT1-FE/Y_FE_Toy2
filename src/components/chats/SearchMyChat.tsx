'use client';
import React, { useCallback, useState } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { Chat, allChatsState } from './chatsStore';

const SearchMyChat = () => {
    const [input, setInput] = useState<string>('');
    const [filteredChats, setFilteredChats] = useState<Chat[]>([]);
    const [allChats, setAllChats] = useRecoilState(allChatsState);
    const onInputChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            setInput(e.target.value);
            const filteredChats = allChats.filter(
                (chat) => chat.name?.toLowerCase().includes(e.target.value.toLowerCase()),
            );
            setFilteredChats(filteredChats);
        },
        [allChats],
    );
    return (
        <Wrapper>
            <SearchItem type="text" placeholder="검색" onChange={onInputChange} />
        </Wrapper>
    );
};

export default SearchMyChat;

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
`;

const SearchItem = styled.input`
    width: 80vw;
    height: 3rem;
    border: none;
    padding: 0.5rem 0.7rem;
    background: #fffefe;
    box-shadow: 0px 4px 30px rgba(0, 0, 0, 0.15);
    border-radius: 20px;
`;

const SearchResults = styled.p`
    font-size: 1rem;
`;
