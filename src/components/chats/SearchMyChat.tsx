'use client';
import React, { useCallback, useState } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { Chat, allChatsState, myChatsState, searchChatsState } from './chatsStore';

const SearchMyChat = ({ userType }: any) => {
    const [input, setInput] = useState<string>('');
    const [filterChats, setFilteredChats] = useRecoilState(searchChatsState);
    const [allChats, setAllChats] = useRecoilState(allChatsState);
    const [myChats, setAllMyChats] = useRecoilState(myChatsState);
    const onInputChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            setInput(e.target.value);
            const filteringChats = (userType === 'my' ? myChats : allChats).filter((chat) =>
                chat.name.toLowerCase().startsWith(e.target.value.toLowerCase()),
            );
            const filteredChats = [...filteringChats];
            setFilteredChats(filteredChats);
            console.log(filteredChats);
        },
        [allChats, myChats],
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
    outline: none;
`;
