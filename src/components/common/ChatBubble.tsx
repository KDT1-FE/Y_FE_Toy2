import { Box, BoxProps, Text } from "@chakra-ui/react";
import React from "react";
import styled from "styled-components";

const Bubble = styled.div`
  margin: 8px 0px 12px;
  padding: 8px;
  background-color: #e2e8f0;
  color: "black";
  width: fit-content;
  max-width: 350px;
  border-radius: 0 12px 12px 12px;
`;

interface ChatBubbleProps extends BoxProps {
  userId?: string;
  text: string;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ userId, text }) => {
  return (
    <Box>
      <Text fontWeight="bold" mb="0px">
        {userId && `${userId}`}
      </Text>
      <Bubble>
        <Text>{text}</Text>
      </Bubble>
    </Box>
  );
};

export default ChatBubble;
