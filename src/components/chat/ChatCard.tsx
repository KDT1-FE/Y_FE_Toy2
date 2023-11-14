import React from 'react';
import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import * as S from '../../styles/chat/ChatCardStyles';
import { ChatType } from '../../types/ChatType';
import { userState } from '../../atoms';

interface IChatProps {
  chat: ChatType;
}

function ChatCard({ chat }: IChatProps) {
  const user = JSON.parse(useRecoilValue(userState));
  const chatPartner = chat.users.find((chatUser) => chatUser.id !== user.id);
  const limit = 5;

  dayjs.extend(relativeTime);
  const receivedTime = dayjs(chat.latestMessage?.createdAt);
  const formattedDistanceToNow = receivedTime.fromNow();

  const latestMessage = chat.latestMessage?.text;
  const messageEllipsis = {
    string: latestMessage ? latestMessage.slice(0, limit) : '',
    isShowMore: latestMessage ? latestMessage.length > limit : false,
  };

  return (
    <Link to={`/chat/${chat.id}`}>
      <S.Wrapper>
        <S.ChatContainer>
          <S.ImageWrapper>
            <S.PartnerImage src={chatPartner?.picture} alt="대화상대 이미지" />
          </S.ImageWrapper>

          <S.ChatPreviewWrapper>
            <S.ChatName>{chatPartner?.username}</S.ChatName>
            {chat.latestMessage ? (
              <S.LatestMessageWrapper>
                <S.LatestMessage>{`${messageEllipsis.string}${
                  messageEllipsis.isShowMore ? '...' : ''
                }`}</S.LatestMessage>
                <S.LatestMessageTime>
                  · {formattedDistanceToNow}
                </S.LatestMessageTime>
              </S.LatestMessageWrapper>
            ) : (
              ''
            )}
          </S.ChatPreviewWrapper>
        </S.ChatContainer>
      </S.Wrapper>
    </Link>
  );
}

export default ChatCard;
