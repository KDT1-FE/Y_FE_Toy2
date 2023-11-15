import {
  Box,
  Button,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from "react";
import connect from "../../../socket/socket";

const GameListChat = () => {
  const [message, setMessage] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const socketMain = connect("9984747e-389a-4aef-9a8f-968dc86a44e4");

  useEffect(() => {
    socketMain.on("message-to-client", (messageObject) => {
      console.log(messageObject);
    });
  }, [socketMain]);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };
  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleMessage();
    }
  };
  const handleMessage = () => {
    if (!message) {
      return alert("전송할 메시지를 입력해주세요:)");
    }
    // 메시지 전송하는 부분 구현
    socketMain.emit("message-to-server", message);
    setMessage("");
    inputRef?.current?.focus();
  };
  return (
    <Box bg="white" borderRadius="5">
      <Box height="200px"></Box>
      <InputGroup size="md">
        <Input
          pr="5rem"
          placeholder="Enter password"
          onChange={onChange}
          onKeyDown={onKeyDown}
          value={message}
        />
        <InputRightElement width="5.5rem">
          <Button
            h="1.75rem"
            size="sm"
            textTransform="uppercase"
            onClick={handleMessage}
          >
            enter
          </Button>
        </InputRightElement>
      </InputGroup>
    </Box>
  );
};

export default GameListChat;
