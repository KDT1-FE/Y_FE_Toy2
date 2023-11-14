import { io } from "socket.io-client";

const connect = (chatId: string) => {
  const token = JSON.parse(localStorage.getItem("token") as string);

  const socket = io(
    `https://fastcampus-chat.net/${
      chatId === "main" ? "server" : `chat?chatId=${chatId}`
    }`,
    {
      extraHeaders: {
        Authorization: `Bearer ${token.accessToken}`,
        serverId: import.meta.env.VITE_APP_SERVER_ID,
      },
    },
  );

  return socket;
};

export default connect;
