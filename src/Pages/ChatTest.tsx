import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ModalPlus from "../components/ModalPlus";

interface User {
  id: string;
  name: string;
  picture: string;
}

const ChatTestWrap = styled.div`
  height: 60vh;
  width: 100%;
  background-color: #fff;
`;

const SmallImg = styled.img`
  width: 30px;
  height: 30px;
`;

function ChatTest() {
  const [onlineUsers, setOnlineUsers] = useState<User[]>([]);
  const accessToken = sessionStorage.getItem("token");
  console.log(onlineUsers);

  useEffect(() => {
    fetch("https://fastcampus-chat.net/users", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        serverId: "1601075b",
        Authorization: `Bearer ${accessToken}`
      }
    })
      .then((response) => response.json() as unknown as User[])
      .then((data) => setOnlineUsers(data))
      .catch((error) => console.error("Error fetching online users:", error));
  }, []);

  // const addRoom = async (id: string) => {
  //   try {
  //     const response = await axios.post(
  //       "https://fastcampus-chat.net/chat",
  //       {
  //         name: "랜덤채팅방이름",
  //         users: [id]
  //       },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${accessToken}`,
  //           serverId: "1601075b"
  //         }
  //       }
  //     );
  //     console.log("채팅방 최초 생성하기", response.data);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  return (
    <ChatTestWrap>
      <ModalPlus />
    </ChatTestWrap>
  );
}

export default ChatTest;
