import React from 'react';
import { Skeleton } from '@mui/material';
import * as S from '../../styles/chat/ChatCardStyles';

function SkeletonChatCard() {
  return (
    <S.Wrapper>
      <S.ChatContainer>
        <S.ImageWrapper>
          <Skeleton variant="circular" width={56} height={56} />
        </S.ImageWrapper>

        <S.ChatPreviewWrapper>
          <S.ChatName>
            <Skeleton variant="text" width={150} />
          </S.ChatName>
          <S.LatestMessageWrapper>
            <S.LatestMessage>
              <Skeleton variant="text" width={60} />
            </S.LatestMessage>
            <S.LatestMessageTime>
              <Skeleton variant="text" width={60} />
            </S.LatestMessageTime>
          </S.LatestMessageWrapper>
        </S.ChatPreviewWrapper>
      </S.ChatContainer>
    </S.Wrapper>
  );
}

export default SkeletonChatCard;
