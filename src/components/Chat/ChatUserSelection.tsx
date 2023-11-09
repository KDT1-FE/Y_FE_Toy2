// import React, { useState } from 'react';
// import styled from 'styled-components';

// interface User {
//     id: string;
//     name: string;
//     picture: string;
// }

// interface ChatUserSelectionProps {
//     users: User[];
//     currentUser: User;
//     onUserSelect: (user: User) => void;
//     createChat: (chatName: string, usersList: string[], isPrivate: boolean) => void;
// }

// const ChatUserSelection: React.FC<ChatUserSelectionProps> = ({
//     users,
//     currentUser,
//     onUserSelect,
//     createChat,
// }) => {
//     const [selectedUsers, setSelectedUsers] = useState<User[]>([]);

//     // 현재 로그인한 사용자를 필터링하여 새로운 배열 생성
//     const filteredUsers = users.filter((user) => user.id !== currentUser.id);

//     const handleUserSelect = (user: User) => {
//         const isUserSelected = selectedUsers.some((selectedUser) => selectedUser.id === user.id);

//         if (isUserSelected) {
//             const updatedSelectedUsers = selectedUsers.filter((selectedUser) => selectedUser.id !== user.id);
//             setSelectedUsers(updatedSelectedUsers);
//         } else {
//             setSelectedUsers([...selectedUsers, user]);
//         }
//     };

//     const startChat = () => {
//         if (selectedUsers.length === 1) {
//             const chatName = `1:1 Chat with ${selectedUsers[0].name}`;
//             const usersList = [currentUser.id, selectedUsers[0].id];
//             const isPrivate = true;

//             createChat(chatName, usersList, isPrivate);
//         } else {
//             // 여러 사용자와의 오픈 채팅 생성 논리를 구현 (예: 선택한 모든 사용자와 채팅 생성)
//         }
//     };

//     return (
//         <UserSelectionContainer>
//             <h2>채팅할 사용자 선택</h2>
//             <UserList>
//                 {filteredUsers.map((user) => (
//                     <UserItem
//                         key={user.id}
//                         onClick={() => handleUserSelect(user)}
//                         selected={selectedUsers.some((selectedUser) => selectedUser.id === user.id)}
//                     >
//                         <UserImg src={user.picture} alt={user.name} />
//                         <UserInfo>
//                             <h3>{user.name}</h3>
//                         </UserInfo>
//                     </UserItem>
//                 ))}
//             </UserList>
//             {selectedUsers.length > 0 && (
//                 <StartChatButton onClick={startChat}>채팅하기</StartChatButton>
//             )}
//         </UserSelectionContainer>
//     );
// };


import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

interface User {
    id: string;
    name: string;
    picture: string;
}

interface ChatUserSelectionProps {
    users: User[];
    currentUser: { id: string; name: string; picture: string; } | null;
    onUserSelect: (user: User) => void;
    createChat: (chatName: string, usersList: string[], isPrivate: boolean) => void;
}

const ChatUserSelection: React.FC<ChatUserSelectionProps> = ({
    users,
    onUserSelect,
    createChat,
}) => {
    const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
    const [currentUser, setCurrentUser] = useState<User | null>(null);

    useEffect(() => {
        // 세션 스토리지에서 로그인한 사용자 정보를 가져오기
        const storedUser = sessionStorage.getItem('userId');
        if (storedUser) {
            const loggedInUser = users.find((user) => user.id === storedUser);
            if (loggedInUser) {
                setCurrentUser(loggedInUser);
            }
        }
    }, [users]);

    const filteredUsers = users.filter((user) => user.id !== currentUser?.id);

    const handleUserSelect = (user: User) => {
        const isUserSelected = selectedUsers.some((selectedUser) => selectedUser.id === user.id);

        if (isUserSelected) {
            const updatedSelectedUsers = selectedUsers.filter((selectedUser) => selectedUser.id !== user.id);
            setSelectedUsers(updatedSelectedUsers);
        } else {
            setSelectedUsers([...selectedUsers, user]);
        }
    };

    const startChat = async () => {
        if (selectedUsers.length === 1 && currentUser?.id) {
          const chatName = `1:1 Chat with ${selectedUsers[0].name}`;
          const usersList = [currentUser.id, selectedUsers[0].id];
          const isPrivate = true;
      
          try {
            const response = await fetch('https://fastcampus-chat.net/chat', {
              method: 'POST',
              body: JSON.stringify({
                name: chatName,
                users: usersList,
                isPrivate,
              }),
              headers: {
                'content-type': 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjUzYjlmOThhOnRlc3QwOSIsImlhdCI6MTY5OTI4NDM2NywiZXhwIjoxNjk5ODg5MTY3fQ.NhoDlvb724HSCCnPg2vGIlv_BeNeOlsiv67C17UvZSE',
                serverId: 'test',
              },
            });
            const data = await response.json();
            console.log(data);
          } catch (error) {
            console.error(error);
          }
        } else {
          // 오픈채팅
        }
      };

    return (
        <UserSelectionContainer>
            <h2>채팅할 사용자 선택</h2>
            <UserList>
                {filteredUsers.map((user) => (
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
