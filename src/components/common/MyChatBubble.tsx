import { BoxProps, Container, Text } from "@chakra-ui/react";
import React from "react";
import styled from "styled-components";

const Bubble = styled.div`
  margin: 8px 0px 12px;
  padding: 8px;
  background-color: #3182ce;
  color: white;
  width: fit-content;
  max-width: 300px;
  border-radius: 0 12px 12px 12px;
`;

interface ChatBubbleProps extends BoxProps {
  userId?: string;
  text: string;
}

const MyChatBubble: React.FC<ChatBubbleProps> = ({ userId, text }) => {
  return (
    <Container>
      <Text fontWeight="bold" mb="0px">
        {userId && `${userId}`}
      </Text>
      <Bubble>
        <Text>{text}</Text>
      </Bubble>
    </Container>
  );
};

export default MyChatBubble;
