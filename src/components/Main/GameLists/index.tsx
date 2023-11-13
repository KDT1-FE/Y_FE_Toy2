import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  Container,
  Grid,
  Heading,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Tag,
  Text,
} from "@chakra-ui/react";
import { IoSettingsOutline } from "react-icons/io5";
import { BiBell } from "react-icons/bi";
import { useEffect, useState } from "react";
import useFetch from "../../../hooks/useFetch";

interface ResponseValue {
  accessToken: string; // 사용자 접근 토큰
  refreshToken: string; // access token 발급용 토큰
  id: string;
}
interface User {
  id: string;
  name: string;
  picture: string;
}
interface FetchResultUser {
  result: {
    user: User;
  };
}

const GameLists = () => {
  const [token, setToken] = useState<ResponseValue>();
  // const [userInfo, serUserInfo] = useState();

  const { result: userInfo }: FetchResultUser = useFetch({
    url: `https://fastcampus-chat.net/user?userId=${token?.id}`,
    method: "GET",
    start: !!token,
  });

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token") as string);
    if (token) {
      setToken(token);
    }
  }, []);

  return (
    <Container
      maxW="container.xl"
      background="url(/src/assets/logo1.png) no-repeat left top #ecedee"
      display="flex"
      width="100%"
      padding="10"
    >
      <Box
        flex="7"
        display="flex"
        flexDirection="column"
        rowGap="5"
        paddingRight="10"
      >
        <Box display="flex" justifyContent="space-between" paddingBottom="5">
          <Text fontSize="3xl" fontWeight="800">
            라이어 게임
          </Text>
          <Button
            bg="blackAlpha.800"
            color="white"
            _hover={{ bg: "blackAlpha.900" }}
          >
            방 만들기
          </Button>
        </Box>
        <Box overflowY="auto" maxHeight="350px">
          <Grid templateColumns="repeat(2, 1fr)" gap={3}>
            <Card
              direction={{ base: "column", sm: "row" }}
              overflow="hidden"
              variant="outline"
            >
              <Image
                objectFit="cover"
                maxW={{ base: "100%", sm: "150px" }}
                src="https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
                alt="Caffe Latte"
              />
              <Stack w="100%" marginLeft="2">
                <CardBody>
                  <Box display="flex" justifyContent="space-between">
                    <Heading size="md">아무나오세요</Heading>
                    <Tag>게임중</Tag>
                  </Box>
                </CardBody>

                <CardFooter display="flex" justifyContent="space-between">
                  <Text>5/6</Text>
                  <Button
                    size="sm"
                    bg="blackAlpha.800"
                    color="white"
                    _hover={{ bg: "blackAlpha.900" }}
                  >
                    입장하기
                  </Button>
                </CardFooter>
              </Stack>
            </Card>
            <Card
              direction={{ base: "column", sm: "row" }}
              overflow="hidden"
              variant="outline"
            >
              <Image
                objectFit="cover"
                maxW={{ base: "100%", sm: "150px" }}
                src="https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
                alt="Caffe Latte"
              />
              <Stack w="100%" marginLeft="2">
                <CardBody>
                  <Box display="flex" justifyContent="space-between">
                    <Heading size="md">아무나오세요</Heading>
                    <Tag>게임중</Tag>
                  </Box>
                </CardBody>

                <CardFooter display="flex" justifyContent="space-between">
                  <Text>5/6</Text>
                  <Button
                    size="sm"
                    bg="blackAlpha.800"
                    color="white"
                    _hover={{ bg: "blackAlpha.900" }}
                  >
                    입장하기
                  </Button>
                </CardFooter>
              </Stack>
            </Card>
            <Card
              direction={{ base: "column", sm: "row" }}
              overflow="hidden"
              variant="outline"
            >
              <Image
                objectFit="cover"
                maxW={{ base: "100%", sm: "150px" }}
                src="https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
                alt="Caffe Latte"
              />
              <Stack w="100%" marginLeft="2">
                <CardBody>
                  <Box display="flex" justifyContent="space-between">
                    <Heading size="md">아무나오세요</Heading>
                    <Tag>게임중</Tag>
                  </Box>
                </CardBody>

                <CardFooter display="flex" justifyContent="space-between">
                  <Text>5/6</Text>
                  <Button
                    size="sm"
                    bg="blackAlpha.800"
                    color="white"
                    _hover={{ bg: "blackAlpha.900" }}
                  >
                    입장하기
                  </Button>
                </CardFooter>
              </Stack>
            </Card>
            <Card
              direction={{ base: "column", sm: "row" }}
              overflow="hidden"
              variant="outline"
            >
              <Image
                objectFit="cover"
                maxW={{ base: "100%", sm: "150px" }}
                src="https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
                alt="Caffe Latte"
              />
              <Stack w="100%" marginLeft="2">
                <CardBody>
                  <Box display="flex" justifyContent="space-between">
                    <Heading size="md">아무나오세요</Heading>
                    <Tag>게임중</Tag>
                  </Box>
                </CardBody>

                <CardFooter display="flex" justifyContent="space-between">
                  <Text>5/6</Text>
                  <Button
                    size="sm"
                    bg="blackAlpha.800"
                    color="white"
                    _hover={{ bg: "blackAlpha.900" }}
                  >
                    입장하기
                  </Button>
                </CardFooter>
              </Stack>
            </Card>
            <Card
              direction={{ base: "column", sm: "row" }}
              overflow="hidden"
              variant="outline"
            >
              <Image
                objectFit="cover"
                maxW={{ base: "100%", sm: "150px" }}
                src="https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
                alt="Caffe Latte"
              />
              <Stack w="100%" marginLeft="2">
                <CardBody>
                  <Box display="flex" justifyContent="space-between">
                    <Heading size="md">아무나오세요</Heading>
                    <Tag>게임중</Tag>
                  </Box>
                </CardBody>

                <CardFooter display="flex" justifyContent="space-between">
                  <Text>5/6</Text>
                  <Button
                    size="sm"
                    bg="blackAlpha.800"
                    color="white"
                    _hover={{ bg: "blackAlpha.900" }}
                  >
                    입장하기
                  </Button>
                </CardFooter>
              </Stack>
            </Card>
            <Card
              direction={{ base: "column", sm: "row" }}
              overflow="hidden"
              variant="outline"
            >
              <Image
                objectFit="cover"
                maxW={{ base: "100%", sm: "150px" }}
                src="https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
                alt="Caffe Latte"
              />
              <Stack w="100%" marginLeft="2">
                <CardBody>
                  <Box display="flex" justifyContent="space-between">
                    <Heading size="md">아무나오세요</Heading>
                    <Tag>게임중</Tag>
                  </Box>
                </CardBody>

                <CardFooter display="flex" justifyContent="space-between">
                  <Text>5/6</Text>
                  <Button
                    size="sm"
                    bg="blackAlpha.800"
                    color="white"
                    _hover={{ bg: "blackAlpha.900" }}
                  >
                    입장하기
                  </Button>
                </CardFooter>
              </Stack>
            </Card>
          </Grid>
        </Box>
        <Box bg="white" borderRadius="5">
          <Box height="200px"></Box>
          <InputGroup size="md">
            <Input pr="5rem" placeholder="Enter password" />
            <InputRightElement width="5.5rem">
              <Button h="1.75rem" size="sm" textTransform="uppercase">
                enter
              </Button>
            </InputRightElement>
          </InputGroup>
        </Box>
      </Box>
      <Box flex="2" display="flex" flexDirection="column" rowGap="5">
        <Card height="160px" padding="5" rowGap="5">
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box display="flex" alignItems="center" columnGap="3">
              <Image
                boxSize="50px"
                objectFit="cover"
                borderRadius="full"
                src={userInfo?.user.picture}
                alt="Dan Abramov"
              />
              <Text>{userInfo?.user.name}</Text>
            </Box>
            <Box display="flex" columnGap="2">
              <IoSettingsOutline />
              <BiBell />
            </Box>
          </Box>
          <Button
            width="71px"
            height="32px"
            fontSize="14px"
            bg="blackAlpha.800"
            color="white"
            margin="0 auto"
            _hover={{ bg: "blackAlpha.900", fontWeight: "800" }}
          >
            로그아웃
          </Button>
        </Card>
        <Card padding="3" height="430px">
          <Text fontSize="large" fontWeight="800" textAlign="center">
            유저 목록
          </Text>
          <Box
            display="flex"
            flexDirection="column"
            rowGap="5"
            paddingY="3"
          ></Box>
        </Card>
      </Box>
    </Container>
  );
};

export default GameLists;
