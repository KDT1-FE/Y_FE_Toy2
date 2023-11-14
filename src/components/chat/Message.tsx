import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import { MessageType } from '../../types/MessageType';
import * as S from '../../styles/chat/MessageStyles';
import { UserInfo } from '../../hooks/useGetUserInfo';

interface IMessageProps {
  userInfo: UserInfo | null;
  message: MessageType;
  messages: MessageType[];
  users: UserInfo[];
}

function Message({ message, messages, userInfo, users }: IMessageProps) {
  const [prevMessage, setPrevMessage] = useState<MessageType | null>(null);
  let isSentByCurrentUser = false;
  const formattedDate = dayjs(message.createdAt).locale('ko').format('A h:mm');
  const trimmedName = message.userId.replace('9b9a6496:', '');
  const sender = users.find((user) => user.id === message.userId);

  if (userInfo?.id === trimmedName) {
    isSentByCurrentUser = true;
  }

  useEffect(() => {
    const prevMessageIndex =
      messages.findIndex((data) => data.id === message.id) - 1;

    setPrevMessage(messages[prevMessageIndex]);
  }, []);

  return isSentByCurrentUser ? (
    <S.MessageContainer sx={{ alignItems: 'flex-end' }}>
      <S.MessageWrapper>
        <S.Date>{formattedDate}</S.Date>
        <S.TextBox sx={{ backgroundColor: 'primary.main' }}>
          <S.MessageText>{message?.text}</S.MessageText>
        </S.TextBox>
      </S.MessageWrapper>
    </S.MessageContainer>
  ) : (
    <S.MessageContainer sx={{ alignItems: 'flex-start' }}>
      {prevMessage?.userId !== message.userId && (
        <S.SenderWrapper>
          <S.ImageWrapper>
            <S.SenderImage src={sender?.picture} alt="보낸사람 이미지" />
          </S.ImageWrapper>
          <S.SenderName>{sender?.name}</S.SenderName>
        </S.SenderWrapper>
      )}
      <S.MessageWrapper>
        <S.TextBox sx={{ backgroundColor: 'secondary.main' }}>
          <S.MessageText>{message?.text}</S.MessageText>
        </S.TextBox>
        <S.Date>{formattedDate}</S.Date>
      </S.MessageWrapper>
    </S.MessageContainer>
  );
}

export default Message;
