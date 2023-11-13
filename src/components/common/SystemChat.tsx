import React from "react";
import { Box } from "@chakra-ui/react";

interface SystemChatProps {
  text: string;
}

const SystemChat: React.FC<SystemChatProps> = ({ text }) => {
  return (
    <Box textAlign="center" bgColor="gray.500">
      {text}
    </Box>
  );
};

export default SystemChat;
