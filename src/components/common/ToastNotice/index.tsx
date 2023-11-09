import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import useFetch from "../../../hooks/useFetch";

const Toast = styled.div`
  border-radius: 16px;

  display: flex;
  justify-content: center;
  flex-direction: column;

  position: absolute;
  top: 2rem;
  left: 2rem;

  background: #cdcdcd;

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

interface Props {
  roomData: {
    id: string;
    name: string;
    host: string;
    bg: string;
    users: string[];
  };
  setToast: React.Dispatch<React.SetStateAction<boolean>>;
}

const ToastNotice: React.FC<Props> = ({ roomData, setToast }) => {
  const navigate = useNavigate();

  const live = useFetch({
    url: "https://fastcampus-chat.net/chat/leave",
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
          onClick={() => {
            live.refresh();
            setToast(false);
          }}
        >
          거절
        </Button>
        <Button
          marginRight="2rem"
          width="50%"
          onClick={() => {
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
