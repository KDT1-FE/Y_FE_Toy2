import { useEffect } from "react";
import { io } from "socket.io-client";

interface Message {
  id: string;
  text: string;
  userId: string;
  createdAt: Date;
}

const useSocket = (
  chatId: string,
  callback?: (messageObject: Message) => void,
) => {
  const token = JSON.parse(localStorage.getItem("token") as string);

  // 소켓 연결
  const socket = io(`https://fastcampus-chat.net/chat?chatId=${chatId}`, {
    extraHeaders: {
      Authorization: `Bearer ${token.accessToken}`,
      serverId: import.meta.env.VITE_APP_SERVER_ID,
    },
  });

  // 변화 감지
  if (callback) {
    useEffect(() => {
      socket.on("message-to-client", (messageObject) => {
        callback(messageObject);
      });

      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [socket]);
  }

  // 메시지 보내기
  const sendMessage = (text: string) => {
    socket.emit("message-to-server", text);
  };

  return sendMessage;
};

export default useSocket;
