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

interface Game {
  name: string;
  users: string[];
  isPrivate?: boolean;
  num?: number;
  bg?: string;
  status?: string;
  id: string;
}

interface Props {
  game: Game | DocumentData;
}

const GameCard = ({ game: { bg, name, num, status, users } }: Props) => {
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
          >
            입장하기
          </Button>
        </CardFooter>
      </Stack>
    </Card>
  );
};

export default GameCard;
