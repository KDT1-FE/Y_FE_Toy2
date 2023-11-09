import React from 'react';
import { MessageType } from '../../types/MessageType';
import * as S from '../../styles/chat/MessageStyles';

interface IMessageProps {
  name: string;
  message: MessageType;
}

function Message({ message, name }: IMessageProps) {
  let isSentByCurrentUser = false;

  const trimmedName = message.userId.replace('9b9a6496:', '');

  if (name === trimmedName) {
    isSentByCurrentUser = true;
  }

  return isSentByCurrentUser ? (
    <S.MessageContainer sx={{ justifyContent: 'flex-end' }}>
      <S.SentUser sx={{ mr: 1 }}>{trimmedName}</S.SentUser>
      <S.MessageBox sx={{ backgroundColor: 'primary.main' }}>
        <S.MessageText>{message?.text}</S.MessageText>
      </S.MessageBox>
    </S.MessageContainer>
  ) : (
    <S.MessageContainer sx={{ justifyContent: 'flex-start' }}>
      <S.MessageBox sx={{ backgroundColor: 'secondary.main' }}>
        <S.MessageText>{message?.text}</S.MessageText>
      </S.MessageBox>
      <S.SentUser sx={{ ml: 1 }}>{trimmedName}</S.SentUser>
    </S.MessageContainer>
  );
}

export default Message;
