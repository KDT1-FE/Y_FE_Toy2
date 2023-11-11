import React, { useState } from 'react';
import styled from 'styled-components';

interface User {
    id: string;
    name: string;
    picture: string;
}

interface ChatUserSelectionProps {
    users: User[];
    onUserSelect: (selectedUser: User) => void;
    closeChatUserSelectionModal: () => void;
}

const ChatUserSelection: React.FC<ChatUserSelectionProps> = ({
    users,
    onUserSelect,
    closeChatUserSelectionModal,
}) => {
    const [selectedUsers, setSelectedUsers] = useState<User[]>([]);

    const handleUserSelect = (user: User) => {
        const isUserSelected = selectedUsers.some((selectedUser) => selectedUser.id === user.id);

        if (isUserSelected) {
            const updatedSelectedUsers = selectedUsers.filter((selectedUser) => selectedUser.id !== user.id);
            setSelectedUsers(updatedSelectedUsers);
        } else {
            setSelectedUsers([...selectedUsers, user]);
        }
    };

    const startChat = () => {
        // "채팅하기" 버튼을 눌렀을 때 실행되는 로직을 추가
        // selectedUsers 배열에 있는 사용자와의 채팅을 시작하도록 구현

        if (selectedUsers.length === 1) {
            const chatName = `1:1 Chat with ${selectedUsers[0].name}`;
            // 선택한 사용자와의 채팅 시작 로직 수행
            console.log('Start 1:1 chat with:', selectedUsers[0]);
        } else {
            // 여러 사용자와의 오픈 채팅 생성 논리 구현
            // 여러 사용자 선택 시 다른 로직을 구현하셔야 합니다.
        }

        // 채팅 로직 실행 후 모달 닫기
        closeChatUserSelectionModal();
    };

    return (
        <UserSelectionContainer>
            <h2>채팅할 사용자 선택</h2>
            <UserList>
                {users.map((user) => (
                    <UserItem
                        key={user.id}
                        onClick={() => handleUserSelect(user)}
                        selected={selectedUsers.some((selectedUser) => selectedUser.id === user.id)}
                    >
                        <UserImg src={user.picture} alt={user.name} />
                        <UserInfo>
                            <h3>{user.name}</h3>
                        </UserInfo>
                    </UserItem>
                ))}
            </UserList>
            {selectedUsers.length > 0 && (
                <StartChatButton onClick={startChat}>채팅하기</StartChatButton>
            )}
        </UserSelectionContainer>
    );
};

const UserSelectionContainer = styled.div`
    padding: 1rem;
    background-color: #f5f5f5;
    max-height: 70vh;  // 높이 제한을 둘 수 있습니다.
    overflow-y: auto;  // 스크롤 활성화
`;

const UserList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

const UserItem = styled.div<{ selected: boolean }>`
    background-color: ${(props) => (props.selected ? '#00956e' : 'white')};
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 0.5rem;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: #00956e;
        color: white;
    }
`;

const UserImg = styled.img`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
`;

const UserInfo = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const StartChatButton = styled.button`
    margin-top: 1rem;
    padding: 0.5rem 1rem;
    background-color: #00956e;
    color: white;
    border: none;
    cursor: pointer;
`;

export default ChatUserSelection;
