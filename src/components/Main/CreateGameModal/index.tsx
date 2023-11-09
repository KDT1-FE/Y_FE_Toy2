import { Button, Input } from "@chakra-ui/react";
import { ChangeEvent, useEffect, useState } from "react";
import { io } from "socket.io-client";
import styled from "styled-components";
import useFetch from "../../../hooks/useFetch";
import useInput from "../../../hooks/useInput";
import UserCard from "../../common/UserCard";
import useFireFetch from "../../../hooks/useFireFetch";
import { useNavigate } from "react-router-dom";
const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;

  width: 100vw;
  height: 100vh;

  background-color: rgba(0, 0, 0, 0.7);
`;

const Wrap = styled.div`
  border-radius: 0.5rem;

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  width: 45rem;
  height: 30rem;

  background-color: #fff;

  display: flex;

  & > div:first-child {
    padding: 3rem 1.5rem 3rem 5rem;
  }
  & > div:last-child {
    padding: 3rem 5rem 3rem 1.5rem;
  }
  & > div:last-child > div {
    border: 1px solid #c6c6c6;
    border-radius: 0.5rem;
    padding: 1rem;
  }
`;

const Section = styled.div`
  width: 50%;
  padding: 3rem;

  & > div {
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const ImgBox = styled.div`
  border: 1px solid #c6c6c6;
  border-radius: 0.5rem;

  width: 7rem;
  height: 7rem;

  display: flex;
  flex-direction: column;
  justify-content: center;

  text-align: center;

  font-size: 3rem;

  margin-bottom: 1.5rem;
`;

const Empty = styled.div`
  flex-grow: 1;
`;

const Radio = styled.div`
  border: 1px solid #c6c6c6;
  border-radius: 0.5rem;

  position: relative;

  width: 100%;

  padding: 1rem;

  display: flex;
  flex-wrap: wrap;

  & > div {
    display: inline-block;
    margin: 0.4rem;
  }
  & > div > label {
    display: inline-block;
    margin-left: 0.2rem;
  }

  & > div.p {
    padding: 0;
    margin: 0;

    position: absolute;
    top: -0.7rem;
    left: 50%;
    transform: translateX(-50%);

    background-color: #fff;
  }
`;

const ButtonWrap = styled.div`
  display: flex;
`;

interface ChatRoom {
  name: string;
  users: string[];
  isPrivate?: boolean;
  num?: number;
  bg?: string;
  status?: string;
}

interface Props {
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateGameModal = ({ setModal }: Props) => {
  const navigate = useNavigate();

  const token = JSON.parse(localStorage.getItem("token") as string);

  const socket = io(
    `https://fastcampus-chat.net/chat?chatId=9fe8a1af-9c60-4937-82dd-21d6da5b9cd9`,
    {
      extraHeaders: {
        Authorization: `Bearer ${token.accessToken}`,
        serverId: import.meta.env.VITE_APP_SERVER_ID,
      },
    },
  );

  const fireFetch = useFireFetch();
  const [roomData, setRoomData] = useState<ChatRoom>({
    name: "",
    users: [],
    isPrivate: false,
    num: 1,
  });

  const users = useFetch({
    url: "https://fastcampus-chat.net/users",
    method: "GET",
    start: true,
  });

  const createGame = useFetch({
    url: "https://fastcampus-chat.net/chat",
    method: "POST",
    data: {
      name: roomData.name,
      users: roomData.users,
    },
    start: false,
  });

  const titleInput = useInput("");

  useEffect(() => {
    const copy = { ...roomData };
    copy.name = titleInput.value;
    setRoomData(copy);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [titleInput.value, titleInput.value]);

  const handleMakeRoom = () => {
    createGame.refresh();

    console.log(roomData);
  };

  const handleRadioChange = (e: ChangeEvent<HTMLInputElement>) => {
    const copy = { ...roomData };
    copy.num = ~~e.target.value;

    setRoomData(copy);
  };

  useEffect(() => {
    if (createGame.result) {
      const newData = {
        ...roomData,
        id: createGame.result.id,
        host: token.id,
      };

      fireFetch.usePostData("game", createGame.result.id, {
        ...newData,
        bg: "⭐",
        status: "대기중",
      });

      // const roomText = [...JSON.stringify(newData)];

      const inviteUser: (string | ChatRoom | string[])[] = [...roomData.users];

      inviteUser.push(newData);
      inviteUser.push("*&^");

      // const text = inviteUser.toString();
      const text = JSON.stringify(inviteUser);

      socket.emit("message-to-server", text);

      navigate(`/game?gameId=${createGame.result.id}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [createGame.result]);

  return (
    <Container>
      <Wrap>
        <Section>
          <div>
            <ImgBox>⭐</ImgBox>
            <Input
              marginBottom="1rem"
              border="1px solid #c6c6c6"
              placeholder="방제목"
              textAlign="center"
              value={titleInput.value}
              onChange={titleInput.onChange}
            />

            <Radio>
              <div className="p">인원 선택</div>
              <div>
                <input
                  type="radio"
                  id="1"
                  name="drone"
                  value="1"
                  defaultChecked
                  onChange={handleRadioChange}
                />
                <label htmlFor="1">1</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="2"
                  name="drone"
                  value="2"
                  checked={roomData.num === 2}
                  onChange={handleRadioChange}
                />
                <label htmlFor="2">2</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="3"
                  name="drone"
                  value="3"
                  checked={roomData.num === 3}
                  onChange={handleRadioChange}
                />
                <label htmlFor="3">3</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="4"
                  name="drone"
                  value="4"
                  checked={roomData.num === 4}
                  onChange={handleRadioChange}
                />
                <label htmlFor="4">4</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="5"
                  name="drone"
                  value="5"
                  checked={roomData.num === 5}
                  onChange={handleRadioChange}
                />
                <label htmlFor="5">5</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="6"
                  name="drone"
                  value="6"
                  checked={roomData.num === 6}
                  onChange={handleRadioChange}
                />
                <label htmlFor="6">6</label>
              </div>
            </Radio>
            <Empty />

            <ButtonWrap>
              <Button width="50%" marginRight="1rem" onClick={handleMakeRoom}>
                방 만들기
              </Button>
              <Button
                width="50%"
                onClick={() => {
                  setModal(false);
                }}
              >
                나가기
              </Button>
            </ButtonWrap>
          </div>
        </Section>
        <Section>
          <div>
            <Input
              border="1px solid #c6c6c6"
              placeholder="검색"
              textAlign="center"
              marginBottom="1rem"
            />
            {users.result &&
              users.result.map((value: any) => {
                return (
                  <UserCard
                    key={value.id}
                    {...value}
                    setRoomData={setRoomData}
                    roomData={roomData}
                  />
                );
              })}
          </div>
        </Section>
      </Wrap>
    </Container>
  );
};

export default CreateGameModal;
