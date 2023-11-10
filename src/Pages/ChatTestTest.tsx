import { useEffect } from "react";
import { io } from "socket.io-client";

const ChatTestTest = () => {
  useEffect(() => {
    const accessToken = sessionStorage.getItem("token"); // Replace with the actual access token
    const socket = io("https://fastcampus-chat.net/server", {
      extraHeaders: {
        Authorization: `Bearer ${accessToken}`,
        serverId: "1601075b"
      }
    });

    // Add event listeners or perform other setup as needed
    socket.on("connect", () => {
      console.log("Connected to server");
      socket.emit("users-server-to-client");
    });

    socket.on("getOnlineUsers", (onlineUsers) => {
      console.log("Online users:", onlineUsers);
      // Handle the list of online users as needed in your application
    });

    // Clean up the socket connection when the component unmounts
    return () => {
      socket.disconnect();
    };
  }, []); // Only run this effect once, similar to componentDidMount

  return <div>채팅채팅</div>;
};

export default ChatTestTest;
