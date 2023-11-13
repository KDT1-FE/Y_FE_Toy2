import React from 'react';
import { Typography } from '@mui/material';
import { MessageType } from '../../types/MessageType';
import { formatDateTime } from '../../utils/formatDate';
import { OpenchatMessageItemWrap } from '../../styles/OpenchatStyle';

interface OpenchatMessageProps {
  isMe: boolean;
  msg: MessageType;
}

function OpenchatMessage({ isMe, msg }: OpenchatMessageProps) {
  return (
    <OpenchatMessageItemWrap isme={`${isMe}`}>
      {!isMe && msg.userId}
      <div className="openchat__msg-wrapper">
        <Typography className="openchat__msg-box">{msg.text}</Typography>
        <Typography className="openchat__time-box" variant="body2">
          {formatDateTime(new Date(msg.createdAt))}
        </Typography>
      </div>
    </OpenchatMessageItemWrap>
  );
}

export default React.memo(OpenchatMessage);
