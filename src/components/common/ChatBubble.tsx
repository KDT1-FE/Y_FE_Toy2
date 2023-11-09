import React from "react";
import { Box, Text, BoxProps } from "@chakra-ui/react";

interface ChatBubbleProps extends BoxProps {
  text: string;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ text, ...rest }) => {
  return (
    <Box my={2} p={2} borderRadius="md" bgColor="gray.200" {...rest}>
      <Text>{text}</Text>
    </Box>
  );
};

export default ChatBubble;
