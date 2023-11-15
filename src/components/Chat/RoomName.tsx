import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../hooks/useAuth";
import useApi from "../../hooks/useApi";

function RoomName({ roomId }: RoomNameProps) {
  const { accessToken } = useContext(AuthContext);
  const { getData } = useApi();
  const [roomName, setRoomName] = useState('');

  useEffect(() => {
    if (!accessToken) {
      return;
    }
    const fetchData = async () => {
      try {
        const res = await getData(
          `https://fastcampus-chat.net/chat/only?chatId=${roomId}`
        );

        setRoomName(res.chat.name);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [accessToken, roomId]);

  return (
      <p className="tit">{roomName}</p>
  );
}

export default RoomName;

interface RoomNameProps {
  roomId: string;
}
