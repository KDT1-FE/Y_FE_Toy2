import React from 'react';
import { Box, Typography } from '@mui/material';
import { MessageType } from '../../../types/MessageType';
import { formatDateTime } from '../../../utils/formatDate';
import { OpenchatMessageItemWrap } from '../../../styles/OpenchatStyle';
import { User } from '../../../types/User';
import OpenchatAvatar from '../common/OpenchatAvatar';

interface OpenchatMessageProps {
  isMe: boolean;
  msg: MessageType;
  user?: User;
}

function OpenchatMessage({ isMe, msg, user }: OpenchatMessageProps) {
  return (
    <OpenchatMessageItemWrap isme={`${isMe}`}>
      {!isMe && user && (
        <Box
          className="openchat__room-avatar"
          sx={{
            width: '3.3rem',
            '& svg': { width: '100%' },
          }}
        >
          <OpenchatAvatar src={user.picture} alt={user.name} />
        </Box>
      )}
      <div>
        <Typography>{!isMe && user?.name}</Typography>
        <div className="openchat__msg-wrapper">
          <Typography className="openchat__msg-box">{msg.text}</Typography>
          <Typography className="openchat__time-box" variant="body2">
            {formatDateTime(new Date(msg.createdAt))}
          </Typography>
        </div>
      </div>
    </OpenchatMessageItemWrap>
  );
}
OpenchatMessage.defaultProps = {
  user: null,
};

export default React.memo(OpenchatMessage);
