import React from 'react';
import { Chip } from '@mui/material';
import { MessageType } from '../../../types/MessageType';
import { User, UserSimple } from '../../../types/User';
import OpenchatMessage from './OpenchatMessage';
import {
  OpenchatMessageByDate,
  OpenchatMessageDateWrap,
} from '../../../styles/OpenchatStyle';
import {
  DateGroupProps,
  OpenchatDateGroupProps,
} from '../../../types/OpenchatType';

function DateGroup({ date, messages, users, myInfo }: DateGroupProps) {
  // 문자열을 Date 객체로 변환
  const dateObject = new Date(date);

  // 연, 월, 일, 요일 추출
  const year = dateObject.getFullYear();
  const month = dateObject.getMonth() + 1; // getMonth()는 0부터 시작하므로 1을 더해줍니다.
  const day = dateObject.getDate();
  const dayOfWeek = dateObject.toLocaleDateString('ko-KR', { weekday: 'long' });

  // 변환된 연-월-일-요일 출력
  const formattedDate = `${year}년 ${month}월 ${day}일 ${dayOfWeek}`;

  const objectComponents = messages.map((message) => {
    const user = users.find((user) => user.id === message.userId);
    if (!user) return null;
    return (
      <OpenchatMessage
        key={message.createdAt}
        isMe={message.userId === myInfo.id}
        msg={message}
        user={user}
      />
    );
  });

  return (
    <div>
      <OpenchatMessageDateWrap>
        <Chip label={formattedDate} />
      </OpenchatMessageDateWrap>
      <OpenchatMessageByDate>{objectComponents}</OpenchatMessageByDate>
    </div>
  );
}

function OpenchatDateGroup({
  messages,
  users,
  myInfo,
}: OpenchatDateGroupProps) {
  const dateMap: { [date: string]: MessageType[] } = {};

  messages.forEach((obj) => {
    const { createdAt } = obj;
    // 문자열을 Date 객체로 변환
    const dateObject = new Date(createdAt);

    // 연, 월, 일 추출
    const year = dateObject.getFullYear();
    const month = dateObject.getMonth() + 1; // getMonth()는 0부터 시작하므로 1을 더해줍니다.
    const day = dateObject.getDate();

    // 변환된 연-월-일 출력
    const formattedDate = `${year}-${month < 10 ? `0${month}` : month}-${
      day < 10 ? `0${day}` : day
    }`;

    if (!dateMap[formattedDate]) {
      dateMap[formattedDate] = [obj];
    } else {
      dateMap[formattedDate].push(obj);
    }
  });

  const groupedComponents = Object.keys(dateMap).map((date) => (
    <DateGroup
      key={date}
      date={date}
      messages={dateMap[date]}
      users={users}
      myInfo={myInfo}
    />
  ));

  return <div>{groupedComponents}</div>;
}

export default OpenchatDateGroup;
