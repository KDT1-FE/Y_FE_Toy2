import React from "react";
import { Box, Text, BoxProps, Container } from "@chakra-ui/react";

interface ChatBubbleProps extends BoxProps {
  userId?: string;
  text: string;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ userId, text, ...rest }) => {
  return (
    <Container>
      <Text fontWeight="bold">{userId && `${userId}`}</Text>
      <Box
        my={2}
        p={2}
        borderRadius="md"
        bgColor={userId ? "blue.200" : "gray.200"}
        {...rest}
        maxW="200px"
      >
        <Text>{text}</Text>
      </Box>
    </Container>
  );
};

export default ChatBubble;
