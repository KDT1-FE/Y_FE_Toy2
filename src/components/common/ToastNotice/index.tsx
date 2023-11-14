import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import useFetch from "../../../hooks/useFetch";
import useFireFetch from "../../../hooks/useFireFetch";
import { userState } from "../../../recoil/atoms/userState";
import { useRecoilValue } from "recoil";

const Toast = styled.div`
  border-radius: 0.5rem;

  display: flex;
  justify-content: center;
  flex-direction: column;

  position: absolute;
  top: 2rem;
  left: 2rem;

  background-color: rgba(20, 20, 20, 0.8);
  color: #fff;

  width: 400px;
  height: 150px;
  padding: 1.5rem;

  & > div:first-child {
    display: flex;
  }
  & > div:last-child {
    display: flex;
  }
`;

const Image = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 3rem;
`;

const Title = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;

  & > div:first-child {
    font-weight: bold;
  }
  & > div:last-child {
    font-size: 0.8rem;
  }
`;

const ButtonWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

interface Socket {
  on(event: string, callback: any): void;
  emit(event: string, data: any): void;
}

interface Props {
  roomData: {
    id: string;
    name: string;
    host: string;
    bg: string;
    users: string[];
  };
  setToast: React.Dispatch<React.SetStateAction<boolean>>;
  socket: Socket;
}

const ToastNotice: React.FC<Props> = ({ roomData, setToast, socket }) => {
  const navigate = useNavigate();
  const fireFetch = useFireFetch();

  const user = useRecoilValue(userState);

  const join = useFetch({
    url: "https://fastcampus-chat.net/chat/participate",
    method: "PATCH",
    data: {
      chatId: roomData.id,
    },
    start: false,
  });

  return (
    <Toast>
      <div>
        <Image>{roomData.bg}</Image>
        <Title>
          <div>{roomData.host} 님이 초대하였습니다.</div>
          <div>{roomData.name}</div>
        </Title>
      </div>
      <ButtonWrap>
        <Button
          marginRight="2rem"
          width="50%"
          variant="outline"
          borderColor="#eee"
          color="#eee"
          colorScheme="whiteAlpha"
          onClick={() => {
            setToast(false);
          }}
        >
          거절
        </Button>
        <Button
          marginRight="2rem"
          width="50%"
          variant="outline"
          borderColor="#eee"
          color="#eee"
          colorScheme="whiteAlpha"
          onClick={() => {
            socket.emit("message-to-server", `${user.id}:${roomData.id}:!#%&(`);
            const users = [...roomData.users, user.id];
            fireFetch.updateData("game", roomData.id, { users: users });
            join.refresh();
            navigate(`/game?gameId=${roomData.id}`);
          }}
        >
          수락
        </Button>
      </ButtonWrap>
    </Toast>
  );
};

export default ToastNotice;
