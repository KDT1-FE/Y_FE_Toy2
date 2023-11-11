// UserSelectionModal.tsx

import { useState } from 'react';
import styled from 'styled-components';

interface User {
    id: string;
    password: string;
    name: string;
    picture: string;
    chats: string[];
}



export const UserSelectionModal = ({ user, newChatId }: { user: User; newChatId: string | null }) => {
    const [isHovered, setIsHovered] = useState(false);
    const { name, picture, id } = user;

    return (
        <User isHovered={isHovered}>
            <UserImg src={picture} />
            <UserInfo>
                <h2>{name}</h2>
                <p>online</p>
                {isHovered && <ChatButton>채팅하기</ChatButton>}
            </UserInfo>
        </User>
    );
};

const User = styled.div<{ isHovered: boolean }>`
    display: flex;
    flex-direction: row;
    gap: 2.5rem;

    margin-bottom: 2rem;

    border-radius: 20px;

    box-shadow: 0px 4px 30px 0px rgba(0, 0, 0, 0.15);

    background-color: ${({ isHovered }) => (isHovered ? '#f0f0f0' : 'white')};

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

const ChatButton = styled.button`
    background-color: #00956e;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 1rem;
`;
