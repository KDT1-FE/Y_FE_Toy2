import { Button } from "@chakra-ui/react";
import { useState } from "react";
import styled from "styled-components";

const Profile = styled.div`
  border: 1px solid #c6c6c6;
  border-radius: 5px;

  width: 100%;

  padding: 0.4rem 1rem;
  margin-bottom: 0.5rem;

  display: flex;
  align-items: center;

  & > img {
    width: 100%;
  }
`;

const ImageWrap = styled.div`
  border-radius: 50%;

  width: 30px;

  overflow: hidden;

  margin-right: 1rem;
`;

const Empty = styled.div`
  flex-grow: 1;
`;

interface ChatRoom {
  name: string;
  users: string[];
  isPrivate?: boolean;
}

interface Props {
  id: string;
  name: string;
  picture: string;
  roomData: ChatRoom;
  setRoomData: React.Dispatch<React.SetStateAction<ChatRoom>>;
}

const UserCard = ({ id, name, picture, roomData, setRoomData }: Props) => {
  const [status, setStatue] = useState(false);

  const handleInvite = () => {
    const copy = { ...roomData };
    if (status) {
      copy.users = copy.users.filter((v) => v !== id);
    } else {
      copy.users.push(id);
    }
    setRoomData(copy);
    setStatue((prev) => !prev);
  };

  return (
    <Profile>
      <ImageWrap>
        <img src={picture} alt="profile" />
      </ImageWrap>
      <span>{name}</span>
      <Empty />
      {status ? (
        <Button
          width="2rem"
          height="1.3rem"
          fontSize=".8rem"
          onClick={handleInvite}
          colorScheme="red"
        >
          취소
        </Button>
      ) : (
        <Button
          width="2rem"
          height="1.3rem"
          fontSize=".8rem"
          onClick={handleInvite}
        >
          초대
        </Button>
      )}
    </Profile>
  );
};

export default UserCard;
