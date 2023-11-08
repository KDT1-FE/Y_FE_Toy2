'use client';
import { SearchUser } from '@/components/Users/SearchUser';
import { UserItem } from '@/components/Users/UserItem';
import { instance } from '@/lib/api';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

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
            const res = await instance.get<any, User[]>('/users');
            setUsers(res);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getUsers();
    }, []);

    return (
        <UsersWrap>
            <div className="header-text_wrap">
                <HeaderText>사용자 목록</HeaderText>
            </div>
            <SearchUser />
            <UserList>
                {users &&
                    users.map((user: User) => {
                        return <UserItem key={user.id} user={user} />;
                    })}
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
