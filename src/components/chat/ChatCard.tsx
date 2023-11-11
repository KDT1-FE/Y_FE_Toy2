import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import * as S from '../../styles/chat/ChatCardStyles';
import { ChatType, User } from '../../types/ChatType';
import { userState } from '../../atoms';

interface IChatProps {
  chat: ChatType;
}

function ChatCard({ chat }: IChatProps) {
  const [chatPartner, setChatPartner] = useState<User | null>(null);
  const user = JSON.parse(useRecoilValue(userState));
  const chatName = chat.name.split('!@#$$#@!')[1];

  dayjs.extend(relativeTime);
  const receivedTime = dayjs(chat.latestMessage?.createdAt);
  const formattedDistanceToNow = receivedTime.fromNow();

  useEffect(() => {
    const userFilter = chat.users.filter((chatUser) => chatUser.id !== user.id);
    setChatPartner(userFilter[0]);
  }, [setChatPartner, chat.users, user.id]);

  return (
    <Link to={`/chat/${chat.id}`}>
      <S.Wrapper>
        <S.ChatContainer>
          <S.ImageWrapper>
            <S.PartnerImage src={chatPartner?.picture} alt="대화상대 이미지" />
          </S.ImageWrapper>

          <S.ChatPreviewWrapper>
            <S.ChatName>{chatName}</S.ChatName>
            <S.LatestMessageWrapper>
              <S.LatestMessage>{chat.latestMessage?.text}</S.LatestMessage>
              <S.LatestMessageTime>
                · {formattedDistanceToNow}
              </S.LatestMessageTime>
            </S.LatestMessageWrapper>
          </S.ChatPreviewWrapper>
        </S.ChatContainer>
      </S.Wrapper>
    </Link>
  );
}

export default ChatCard;
