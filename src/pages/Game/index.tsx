import {
  Button,
  Card,
  Center,
  Grid,
  GridItem,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useMemo, useRef, useState } from "react";
import GameChat from "../../components/Game/GameChat";
import Keyword from "../../components/Game/Keyword";
import data from "../../data/category.json";
import useFireFetch from "../../hooks/useFireFetch";
import { io } from "socket.io-client";

interface ProfileCardProps {
  userId: string;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ userId }) => {
  return (
    <Card w="200px" h="200px" justify="center" mb="20px">
      <Center>
        <Text fontWeight="bold">{userId}</Text>
      </Center>
    </Card>
  );
};

interface Categories {
  category: string;
  keyword: string[];
}
[];

const Game = () => {
  const queryString = window.location.search;
  const searchParams = new URLSearchParams(queryString);
  const gameId = searchParams.get("gameId");

  const fireFetch = useFireFetch();
  const gameData = fireFetch.useGetSome("game", "id", gameId as string);

  // gameData.data가 변경될 때만 'users'를 재계산하도록 함
  const users = useMemo(() => {
    if (gameData.data && gameData.data[0] && gameData.data[0].users) {
      return gameData.data[0].users;
    }
    return [];
  }, [gameData.data]);

  const [status, setStatus] = useState("");

  const categories = data.CategoryList;

  const [category, setCategory] = useState<Categories | null>(null);
  const [keyword, setKeyword] = useState("");

  const { onOpen } = useDisclosure();

  const token = JSON.parse(localStorage.getItem("token") as string);
  const socket = useRef<ReturnType<typeof io> | null>(null);

  useEffect(() => {
    // 소켓 연결
    socket.current = io(`https://fastcampus-chat.net/chat?chatId=${gameId}`, {
      extraHeaders: {
        Authorization: `Bearer ${token.accessToken}`,
        serverId: import.meta.env.VITE_APP_SERVER_ID,
      },
    });

    // socket.current.emit("joinRoom", { gameId });

    // socket.current.on("gameUpdated", (data: any) => {
    //   // ... 상태 업데이트 로직 ...
    // });

    return () => {
      if (socket.current) {
        socket.current.off("gameUpdated");
        socket.current.emit("leaveRoom", { gameId });
        socket.current.disconnect();
      }
    };
  }, [gameId]);

  useEffect(() => {
    if (gameData.data && gameData.data.length > 0) {
      setStatus(gameData.data[0].status);
    }
  }, [gameData.data]);

  useEffect(() => {
    if (status === "게임중") {
      const currentCategory = window.localStorage.getItem("category") ?? "";
      const currentKeyword = window.localStorage.getItem("keyword") ?? "";

      setCategory({ category: currentCategory, keyword: [currentKeyword] });
      setKeyword(currentKeyword);
    }

    // 로컬 스토리지에 유저 목록이 없을 때만 순서 섞기
    if (status === "게임중" && !window.localStorage.getItem("shuffledUsers")) {
      const shuffled = shuffleArray([...users]);
      window.localStorage.setItem("shuffledUsers", JSON.stringify(shuffled));
    }
  }, [status, users]);

  // 랜덤 숫자 계산
  const getRandNum = (length: number): number => {
    const randNum = Math.floor(Math.random() * length);

    return randNum;
  };

  // 랜덤 순서 지정
  const shuffleArray = (array: Array<string>) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  // 게임 시작
  const handleStart = async () => {
    // 게임 상태 업데이트
    await updateStatus("게임중");

    // 카테고리와 키워드 선택
    const selectedCategory = categories[getRandNum(categories.length)];
    const ranKeyword =
      selectedCategory.keyword[getRandNum(selectedCategory.keyword.length)];

    // 서버로 게임 시작 이벤트 전송
    socket.current?.emit("startGame", {
      gameId,
      status: "게임중",
      category: selectedCategory,
      keyword: ranKeyword,
    });

    // 유저들의 순서를 랜덤으로 섞고 로컬 스토리지에 저장
    const shuffledUsers = shuffleArray([...users]);
    window.localStorage.setItem("shuffledUsers", JSON.stringify(shuffledUsers));
    const ranLiar = shuffledUsers[getRandNum(shuffledUsers.length)]; // 라이어 선택

    // 상태 업데이트
    setCategory(selectedCategory);
    setKeyword(ranKeyword);

    window.localStorage.setItem("category", selectedCategory.category);
    window.localStorage.setItem("keyword", ranKeyword);
    if (ranLiar === "연수") {
      window.localStorage.setItem("liar", "true");
    } else {
      window.localStorage.setItem("liar", "false");
    }
    onOpen();
  };

  // status 업데이트 함수
  const updateStatus = (newStatus: string) => {
    setStatus(newStatus);
    if (gameId) {
      fireFetch.updateData("game", gameId, { status: newStatus });
    }
  };

  // status 변화에 따라 localStorage에 저장
  useEffect(() => {
    if (status === "게임중") {
      const currentCategory = window.localStorage.getItem("category") ?? "";
      const currentKeyword = window.localStorage.getItem("keyword") ?? "";

      setCategory({ category: currentCategory, keyword: [currentKeyword] });
      setKeyword(currentKeyword);
    }
  }, [status]);

  // 게임 종료
  const hadleEnd = async () => {
    await updateStatus("대기중");

    // 서버로 게임 종료 이벤트 전송
    socket.current?.emit("endGame", {
      gameId,
      status: "대기중",
    });
    // 로컬 스토리지에서 게임 관련 데이터 삭제
    window.localStorage.removeItem("category");
    window.localStorage.removeItem("keyword");
    window.localStorage.removeItem("liar");
    setCategory(null);
    setKeyword("");
  };

  // 로컬 스토리지에서 유저 목록 가져오기
  const storedUsers = JSON.parse(
    window.localStorage.getItem("shuffledUsers") || "[]",
  );

  console.log(gameData.data);
  console.log(category, keyword);

  if (gameData.data.length === 0) {
    return <p>Loading...</p>;
  }

  if (!gameId) {
    return null;
  }

  return (
    <>
      <Grid
        templateColumns="200px 1fr 200px"
        templateRows="60px 1fr"
        gap="20px"
        mt="50px"
      >
        <GridItem>
          <Button w="200px" mr="20px">
            뒤로가기
          </Button>
        </GridItem>
        <GridItem>
          <Card h="100%" justifyContent="center">
            <Center fontWeight="bold">
              {status === "게임중" ? (
                <>
                  <p>
                    주제는 {window.localStorage.getItem("category")} 입니다.
                    &nbsp;
                  </p>

                  {window.localStorage.getItem("liar") === "true" ? (
                    <p>당신은 Liar 입니다. </p>
                  ) : (
                    <p>
                      키워드는 {window.localStorage.getItem("keyword")} 입니다.
                    </p>
                  )}
                </>
              ) : (
                <p>게임을 시작해주세요.</p>
              )}
            </Center>
          </Card>
        </GridItem>
        <GridItem>
          <Button w="200px" mr="20px">
            {status === "대기중" ? (
              <Button onClick={handleStart}>게임시작</Button>
            ) : (
              <Button onClick={hadleEnd}>게임 종료</Button>
            )}
            <Keyword status={status} />
          </Button>
        </GridItem>
        <GridItem>
          {storedUsers.slice(0, 3).map((user: string, index: number) => {
            return <ProfileCard key={index} userId={user}></ProfileCard>;
          })}
        </GridItem>
        <GridItem>
          <GameChat gameId={gameId} />
        </GridItem>
        <GridItem>
          {storedUsers.slice(3, 6).map((user: string, index: number) => {
            return <ProfileCard key={index} userId={user}></ProfileCard>;
          })}
        </GridItem>
      </Grid>
    </>
  );
};

export default Game;
