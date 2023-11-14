'use client';
import React, { useCallback, useState } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { Chat, searchChatsState } from './chatsStore';
import { MdSearch } from 'react-icons/md';
import { getAllChats, getMyChats } from './getChats';
import { useQuery } from '@tanstack/react-query';

const SearchMyChat = ({ userType }: { userType: string }) => {
  const [input, setInput] = useState<string>('');
  const [filterChats, setFilteredChats] = useRecoilState(searchChatsState);

  const { data: chats } = useQuery<Chat[], unknown>({
    queryKey: ['getChatsKey'],
    queryFn: userType === 'my' ? getMyChats : getAllChats,
    refetchOnWindowFocus: false,
    refetchInterval: 1000,
  });
  const onInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setInput(e.target.value);
      if (chats) {
        const filteringChats = chats.filter((chat) => {
          const filterValue = chat.name.toLowerCase().includes(e.target.value.toLowerCase());
          return filterValue;
        });
        const filteredChats = [...filteringChats];
        console.log(filteredChats);
        setFilteredChats(filteredChats);
      }
    },
    [chats],
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

const SearchUserBox = styled.div`
  background-color: white;

  border-radius: 20px;
  box-shadow: ${({ theme }) => theme.shadow.search};

  width: 100%;
  height: 3.5rem;

  display: flex;
  gap: 3%;
`;

const SearchItem = styled.input`
  border: none;
  width: 32rem;
  outline: none;
  font-size: 1.2rem;

  @media screen and (max-width: 768px) {
    width: 60vw;
  }
`;

const SearchButton = styled.div`
  background-color: ${({ theme }) => theme.color.mainGreen};
  width: 5rem;

  display: flex;
  align-items: center;
  justify-content: center;

  border-top-left-radius: 15px;
  border-bottom-left-radius: 15px;
`;
