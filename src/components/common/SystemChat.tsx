import React from "react";
import { Box } from "@chakra-ui/react";

interface SystemChatProps {
  text: string;
}

const SystemChat: React.FC<SystemChatProps> = ({ text }) => {
  return (
    <Box textAlign="center" bgColor="gray.300" p={1} borderRadius={5} my={2}>
      {text}
    </Box>
  );
};

export default SystemChat;
