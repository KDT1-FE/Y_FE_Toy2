'use client';
import React, { useCallback, useState } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { Chat, allChatsState, myChatsState, searchChatsState } from './chatsStore';
import { SearchButton, SearchUserBox } from '@/app/users/page';
import { MdSearch } from 'react-icons/md';

const SearchMyChat = ({ userType }: any) => {
    const [input, setInput] = useState<string>('');
    const [filterChats, setFilteredChats] = useRecoilState(searchChatsState);
    const [allChats, setAllChats] = useRecoilState(allChatsState);
    const [myChats, setAllMyChats] = useRecoilState(myChatsState);
    const onInputChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            setInput(e.target.value);
            const filteringChats = (userType === 'my' ? myChats : allChats).filter((chat) =>
                chat.name.toLowerCase().includes(e.target.value.toLowerCase()),
            );
            const filteredChats = [...filteringChats];
            setFilteredChats(filteredChats);
        },
        [allChats, myChats],
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
// const SearchItem = styled.input`
//     width: 80vw;
//     height: 3rem;
//     border: none;
//     padding: 0.5rem 0.7rem;
//     background: #fffefe;
//     box-shadow: 0px 4px 30px rgba(0, 0, 0, 0.15);
//     border-radius: 20px;
//     outline: none;
//     color: #00956e;
//     font-weight: bold;
//     font-size: 1.2rem;
// `;
