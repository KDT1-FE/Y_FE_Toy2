import React from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import { MessageType } from '../../types/MessageType';
import * as S from '../../styles/chat/DatePlaceholderStyles';

interface IDatePlaceholderProps {
  prevMessage: MessageType | null;
  message: MessageType;
}

dayjs.locale('ko');

function DatePlaceholder({ prevMessage, message }: IDatePlaceholderProps) {
  const formattedDate = dayjs(message.createdAt).format(
    'YYYY년 MM월 DD일 dddd',
  );
  const PrevFormattedDate = dayjs(prevMessage?.createdAt).format(
    'YYYY년 MM월 DD일 dddd',
  );

  return (
    <S.DateWrapper
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {formattedDate !== PrevFormattedDate ? (
        <S.Date label={formattedDate} />
      ) : (
        ''
      )}
    </S.DateWrapper>
  );
}

export default DatePlaceholder;
