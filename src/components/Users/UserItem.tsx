'use client';
import { useState } from 'react';
import styled from 'styled-components';
import UserProfileModal from './UserProfileModal';

interface User {
    id: string;
    password: string;
    name: string;
    picture: string;
    chats: string[];
}

export const UserItem = ({ user }: { user: User }) => {
    // 사용할 때 eslint 주석 삭제
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { name, picture, id } = user;
    const [showModal, setShowModal] = useState(false);

    const clickModal = () => setShowModal(!showModal);
    return (
        <>
            <User onClick={clickModal}>
                <UserImg src={picture} />
                <UserInfo>
                    <h2>{name}</h2>
                    <p>online</p>
                </UserInfo>
            </User>
            {showModal && <UserProfileModal clickModal={clickModal} user={user} />}
        </>
    );
};

const User = styled.div`
    display: flex;
    flex-direction: row;
    gap: 2.5rem;

    margin-bottom: 2rem;

    border-radius: 20px;

    box-shadow: 0px 4px 30px 0px rgba(0, 0, 0, 0.15);

    background-color: white;

    padding: 1rem 2rem;

    cursor: pointer;

    &:hover {
        opacity: 70%;
        transition: 0.4s;
    }
`;

const UserImg = styled.img`
    width: 60px;
    height: 60px;

    border-radius: 70%;

    overflow: hidden;

    margin-top: 5px;
`;

const UserInfo = styled.div`
    line-height: 10px;
`;
