import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  Heading,
  Stack,
  Tag,
  Text,
} from "@chakra-ui/react";
import { DocumentData } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { userState } from "../../../recoil/atoms/userState";
import { useRecoilValue } from "recoil";
import useFetch from "../../../hooks/useFetch";
import useFireFetch from "../../../hooks/useFireFetch";

interface Game {
  name: string;
  users: string[];
  isPrivate?: boolean;
  num?: number;
  bg?: string;
  status?: string;
  id: string;
}

interface Socket {
  on(event: string, callback: any): void;
  emit(event: string, data: any): void;
}

interface Props {
  game: Game | DocumentData;
  socket: Socket;
}

const GameCard = ({
  game: { id, bg, name, num, status, users },
  socket,
}: Props) => {
  const fireFetch = useFireFetch();
  const navigate = useNavigate();
  const user = useRecoilValue(userState);

  // 입장 요청 선언
  const join = useFetch({
    url: "https://fastcampus-chat.net/chat/participate",
    method: "PATCH",
    data: {
      chatId: id,
    },
    start: false,
  });

  const getChat = useFetch({
    url: `https://fastcampus-chat.net/chat/only?chatId=${id}`,
    method: "GET",
    start: false,
  });

  // // 게임 정보 조회
  // const gameInfo = useFetch({
  //   url: `https://fastcampus-chat.net/chat/only?chatId=${id}`,
  //   method: "GET",
  //   start: true,
  // });

  // 게임 입장 함수
  const joinGame = () => {
    getChat.refresh();
    fireFetch.get("game", "id", id).then((res: any) => {
      socket.emit("message-to-server", `${user.id}:${id}:!#%&(`);
      const users = [...res[0].users, user.id];
      fireFetch.updateData("game", id, { users: users });
      join.refresh();
      navigate(`/game?gameId=${id}`);
    });
  };

  return (
    <Card
      direction={{ base: "column", sm: "row" }}
      overflow="hidden"
      variant="outline"
      display="flex"
      alignItems="center"
    >
      <Box fontSize="4rem" pl="5">
        {bg}
      </Box>
      <Stack w="100%" marginLeft="2">
        <CardBody>
          <Box display="flex" justifyContent="space-between">
            <Heading size="md">
              {name.length >= 8 ? name.substr(0, 6) + "..." : name}
            </Heading>
            <Tag
              color={status === "게임중" ? "white" : ""}
              bgColor={status === "게임중" ? "green" : ""}
            >
              {status}
            </Tag>
          </Box>
        </CardBody>

        <CardFooter display="flex" justifyContent="space-between">
          <Text>
            {users.length}/{num}
          </Text>
          <Button
            size="sm"
            bg="blackAlpha.800"
            color="white"
            _hover={{ bg: "blackAlpha.900" }}
            onClick={joinGame}
            isDisabled={status === "게임중" ? true : false}
          >
            입장하기
          </Button>
        </CardFooter>
      </Stack>
    </Card>
  );
};

export default GameCard;
