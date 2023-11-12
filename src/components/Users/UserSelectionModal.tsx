import { useState } from 'react';
import styled from 'styled-components';

interface User {
    id: string;
    password: string;
    name: string;
    picture: string;
    chats: string[];
}

interface UserSelectionModalProps {
    user: User;
    onUserSelect: (user: User) => void;
    
}

export const UserSelectionModal = ({ user, onUserSelect }: UserSelectionModalProps) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isSelected, setIsSelected] = useState(false);

    const { name, picture, id } = user;

    const handleUserClick = () => {
        onUserSelect(user);
        setIsSelected(!isSelected); // 선택 여부 토글
        console.log(user.id)
    };

    return (
        <User isHovered={isHovered} isSelected={isSelected} onClick={handleUserClick} >
            <UserImg src={picture} />
            <UserInfo>
                <h2>{name}</h2>
                <p>online</p>

            </UserInfo>
        </User>
    );
};

const User = styled.div<{ isHovered: boolean; isSelected: boolean }>`
    display: flex;
    flex-direction: row;
    gap: 2.5rem;

    margin-bottom: 2rem;

    border-radius: 20px;

    box-shadow: 0px 4px 30px 0px rgba(0, 0, 0, 0.15);

    background-color: ${({ isHovered, isSelected }) => (isSelected ? 'lightblue' : isHovered ? '#f0f0f0' : 'white')};

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
