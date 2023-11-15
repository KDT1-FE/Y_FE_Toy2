import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../hooks/useAuth";
import useApi from "../../hooks/useApi";

function UserCount({ roomId }: UserCountProps) {
  const { accessToken } = useContext(AuthContext);
  const { getData } = useApi();
  const [userCount, setUserCount] = useState(0);

  useEffect(() => {
    if (!accessToken) {
      return;
    }
    const fetchData = async () => {
      try {
        const res = await getData(
          `https://fastcampus-chat.net/chat/only?chatId=${roomId}`
        );

        setUserCount(res.chat.users.length);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [accessToken, roomId]);

  return (
    <>
      <img src="/src/assets/images/user-ico.png" width="14"></img>
      <span className="num">{userCount}</span>
    </>
  );
}

export default UserCount;

interface UserCountProps {
  roomId: string;
}
