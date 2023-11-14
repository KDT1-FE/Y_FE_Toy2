import { useState, useEffect, useContext, useCallback } from "react";
import { Socket, io } from "socket.io-client";
import useApi from "../hooks/useApi";
import { AuthContext } from "../hooks/useAuth";
import styled from "styled-components";

export interface ChatI {
  id: string;
  name: string;
  users: User[];
  isPrivate: boolean;
  updatedAt: string;
  latestMessage: string;
}

interface User {
  id: string;
  name: string;
  picture: string;
}

interface ResponseValue {
  auth: boolean;
  user?: User;
}

function ChatTesters() {
  const [users, setUsers] = useState<User[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
  const { accessToken } = useContext(AuthContext);
  const [socket, setSocket] = useState<Socket | null>(null);
  const { getData } = useApi();

  // 현재 로그인한 유저 정보 출력
  const checkCurrentUser = async () => {
    if (!accessToken) {
      console.log("No access token available.");
      return;
    }
    try {
      const response: ResponseValue = await getData(
        "https://fastcampus-chat.net/auth/me"
      );
      if (response.auth && response.user) {
        setCurrentUser(response.user);
        console.log("Current User:", response.user);
      } else {
        console.log("Authentication failed or no user data.");
      }
    } catch (error) {
      console.error("Error fetching current user information:", error);
    }
  };

  // 모든 유저 출력
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersData: User[] = await getData(
          "https://fastcampus-chat.net/users"
        );
        setUsers(usersData);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    if (accessToken) {
      fetchUsers();
    }
  }, [accessToken, getData]);

  // 현재 온라인인 유저 실시간 출력
  useEffect(() => {
    if (!socket && accessToken) {
      console.log("Creating new socket connection");
      const newSocket = io(`https://fastcampus-chat.net/server`, {
        extraHeaders: {
          Authorization: `Bearer ${accessToken}`,
          serverId: "1601075b"
        }
      });

      newSocket.on(
        "users-server-to-client",
        (response: { users: string[] }) => {
          console.log(
            "Event: users-server-to-client, Online Users:",
            response.users
          );
          setOnlineUsers(response.users);
        }
      );

      setSocket(newSocket);

      return () => {
        console.log("Disconnecting socket");
        newSocket.off("users-to-client");
        newSocket.disconnect();
      };
    }
  }, [accessToken]);

  // 모든 유저 중 현재 온라인인 유저만 필터링
  const isUserOnline = useCallback(
    (userId: string) => {
      return onlineUsers.includes(userId);
    },
    [onlineUsers]
  );

  // 현재 생성된 채팅방 목록 콘솔로그에 출력
  const checkCurrentChats = async () => {
    try {
      const currentChats = await getData(
        "https://fastcampus-chat.net/chat/all"
      );
      console.log(currentChats);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div>
        <h2>Users</h2>
        <UserList>
          {users.map((user) => (
            <div key={user.id}>
              <p>
                {user.name}
                <OnlineIndicator
                  className={isUserOnline(user.id) ? "online" : ""}
                />
              </p>
              <div>
                <img src={user.picture} alt={user.name} />
              </div>
            </div>
          ))}
        </UserList>
      </div>
      <div>
        <button onClick={checkCurrentUser}>Who am I?</button>
        {currentUser && (
          <div>
            <h3>Logged in as:</h3>
            <p>ID: {currentUser.id}</p>
            <p>Name: {currentUser.name}</p>
            <img src={currentUser.picture} alt={currentUser.name} />
          </div>
        )}
        <button onClick={checkCurrentChats}>Current Chats?</button>
      </div>
    </>
  );
}

export default ChatTesters;

const OnlineIndicator = styled.span`
  height: 10px;
  width: 10px;
  background-color: #bbb;
  border-radius: 50%;
  display: inline-block;
  margin-right: 5px;

  &.online {
    background-color: #0f0;
  }
`;

const UserList = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  img {
    width: 2em;
    height: 2em;
  }
`;
