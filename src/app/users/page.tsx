'use client';
import { UserItem } from '@/components/Users/UserItem';
import { instance } from '@/lib/api';
import { ChangeEvent, useEffect, useState } from 'react';
import styled from 'styled-components';
import { MdClose, MdSearch } from 'react-icons/md';

interface User {
    id: string;
    password: string;
    name: string;
    picture: string;
    chats: string[];
}

export default function Users() {
    const [users, setUsers] = useState<User[] | []>([]);
    const getUsers = async () => {
        try {
            let res = await instance.get<any, User[]>('/users');
            res = res.filter((user) => user.id !== sessionStorage.getItem('userId'));
            setUsers(res);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getUsers();
    }, []);

    /**사용자 검색 */
    const [userInput, setUserInput] = useState('');
    const getInputValue = (e: ChangeEvent<HTMLInputElement>) => {
        setUserInput(e.target.value);
    };
    const searched = users.filter((user) => user.name.includes(userInput));

    const clearSearchInput = () => {
        setUserInput('');
    };

    return (
        <UsersWrap>
            <HeaderText>사용자 목록</HeaderText>
            <SearchUserBox>
                <SearchButton>
                    <MdSearch className="searchIcon" size="35" color="white" />
                </SearchButton>
                <SearchUserInput
                    value={userInput}
                    onChange={getInputValue}
                    type="text"
                    placeholder="사용자를 검색해보세요"
                />
                <ClearButton>
                    {userInput && <MdClose className="clearIcon" size="25" onClick={clearSearchInput} />}
                </ClearButton>
            </SearchUserBox>
            <UserList>
                {searched.length !== 0 ? (
                    searched.map((user: User) => {
                        return <UserItem key={user.id} user={user} />;
                    })
                ) : (
                    <NoUserWrap>
                        <NoUserText>해당 사용자가 존재하지 않습니다.</NoUserText>
                    </NoUserWrap>
                )}
            </UserList>
        </UsersWrap>
    );
}

const UsersWrap = styled.div`
    padding: 3rem;

    display: flex;
    flex-direction: column;
    gap: 10;
`;

const HeaderText = styled.h1`
    color: #00956e;
`;

const UserList = styled.div`
    margin-top: 2rem;
`;

const NoUserWrap = styled.div`
    text-align: center;
    margin-top: 8rem;
`;

const NoUserText = styled.h2`
    color: #05664c;
`;

/**사용자 검색 */
const SearchUserBox = styled.div`
    background-color: white;

    border-radius: 20px;
    box-shadow: 0px 2px 30px 0px rgba(0, 0, 0, 0.15);

    width: 100%;
    height: 3.5rem;

    display: flex;
    gap: 3%;
`;

const SearchButton = styled.div`
    background-color: #00956e;
    width: 5rem;

    display: flex;
    align-items: center;
    justify-content: center;

    border-top-left-radius: 15px;
    border-bottom-left-radius: 15px;
`;

const SearchUserInput = styled.input`
    border: none;

    width: 32rem;

    outline: none;

    font-size: 1.2rem;
`;

const ClearButton = styled.div`
    margin-right: 2.5rem;

    display: flex;
    align-items: center;

    cursor: pointer;

    .clearIcon {
        color: #00956e;
        &:hover {
            color: #05664c;
            transition: 0.4s;
        }
    }
`;
