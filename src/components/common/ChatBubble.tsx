import { BoxProps, Container, Text } from "@chakra-ui/react";
import React from "react";
import styled from "styled-components";

interface BubbleProps extends BoxProps {
  isMyMessage?: boolean;
}

const Bubble = styled.div<BubbleProps>`
  margin: 8px 0px 12px;
  padding: 8px;
  background-color: ${(props) => (props.isMyMessage ? "#3182ce" : "#e2e8f0")};
  color: ${(props) => (props.isMyMessage ? "white" : "black")};
  width: fit-content;
  max-width: 300px;
  border-radius: 0 12px 12px 12px;
`;
interface ChatBubbleProps extends BoxProps {
  userId?: string;
  text: string;
  isMyMessage?: boolean;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({
  userId,
  text,
  isMyMessage,
}) => {
  return (
    <Container>
      <Text fontWeight="bold" mb="0px">
        {userId && `${userId}`}
      </Text>
      <Bubble isMyMessage={isMyMessage}>
        <Text>{text}</Text>
      </Bubble>
    </Container>
  );
};

export default ChatBubble;
