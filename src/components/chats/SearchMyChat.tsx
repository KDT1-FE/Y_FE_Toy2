'use client';
import React, { useCallback, useState } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { Chat, allChatsState, myChatsState, searchChatsState } from './chatsStore';
import { SearchButton, SearchUserBox } from '@/app/users/page';
import { MdSearch } from 'react-icons/md';
import { getAllChats, getMyChats } from './getChats';
import { useQuery } from '@tanstack/react-query';

const SearchMyChat = ({ userType }: any) => {
    const [input, setInput] = useState<string>('');
    const [filterChats, setFilteredChats] = useRecoilState(searchChatsState);

    const { data: chats, isLoading } = useQuery<Chat[], any>({
        queryKey: ['getChatsKey'],
        queryFn: userType === 'my' ? getMyChats : getAllChats,
        refetchOnWindowFocus: false,
        staleTime: 10000,
    });
    const onInputChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            setInput(e.target.value);
            if (!isLoading && chats) {
                const filteringChats = chats.filter((chat) => {
                    const filterValue = chat.name.toLowerCase().startsWith(e.target.value.toLowerCase());
                    return filterValue;
                });
                console.log('Filtering Chats:', filteringChats);
                const filteredChats = [...filteringChats];
                setFilteredChats(filteredChats);
            }
        },
        [isLoading, chats],
    );
    return (
        <Wrapper>
            <SearchUserBox>
                <SearchButton>
                    <MdSearch className="searchIcon" size="35" color="white" />
                </SearchButton>
                <SearchItem type="text" placeholder="검색" onChange={onInputChange} />
            </SearchUserBox>
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
    border: none;
    width: 32rem;
    outline: none;
    font-size: 1.2rem;
`;
