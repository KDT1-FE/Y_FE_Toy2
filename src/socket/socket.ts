import { io } from "socket.io-client";
import { authState } from "../recoil/atoms/authState";
import { useRecoilValue as recoil } from "recoil";

const connect = (chatId: string) => {
  const auth = recoil(authState);

  const socket = io(
    `https://fastcampus-chat.net/${
      chatId === "main" ? "server" : `chat?chatId=${chatId}`
    }`,
    {
      extraHeaders: {
        Authorization: `Bearer ${auth.accessToken}`,
        serverId: import.meta.env.VITE_APP_SERVER_ID,
      },
    },
  );

  return socket;
};

export default connect;
