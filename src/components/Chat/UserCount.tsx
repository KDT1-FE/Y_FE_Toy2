import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../hooks/useAuth";
import useApi from "../../hooks/useApi";
import styled from "styled-components";
import { ThemeContext } from "../../App";
import UserIcon from "../../assets/images/user-ico.png";

function UserCount({ roomId }: UserCountProps) {
  const { accessToken } = useContext(AuthContext);
  const { getData } = useApi();
  const [userCount, setUserCount] = useState(0);
  const { theme } = useContext(ThemeContext);

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
    <Wrapper>
      <IconImg src={UserIcon} alt="user-icon" theme={theme} />
      <span className="num">{userCount}</span>
    </Wrapper>
  );
}

export default UserCount;

interface UserCountProps {
  roomId: string;
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.2em;

  span {
    color: black;
  }
`;
const IconImg = styled.img`
  width: 1em;
  height: 1em;
`;
