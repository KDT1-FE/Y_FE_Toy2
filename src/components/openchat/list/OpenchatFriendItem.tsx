import React from 'react';
import { Tooltip, Typography } from '@mui/material';
import { Send } from '@mui/icons-material';
import { UserInfoWithId } from '../../../types/User';
import { OpenchatFriendWrap } from '../../../styles/OpenchatStyle';

interface OpenchatFriendProps {
  friend: UserInfoWithId;
}

function OpenchatFriendItem({ friend }: OpenchatFriendProps) {
  return (
    <OpenchatFriendWrap>
      <div className="openchat__friend-img">
        <img src={friend.image} alt={friend.name} />
      </div>
      <div className="openchat__friend-text">
        <Typography variant="body1" className="openchat__friend-name">
          {friend.name} ({friend.id})
        </Typography>
        <Typography
          variant="body2"
          className="openchat__friend-tags overflow-ellipsis"
          color="GrayText"
        >
          {friend.hashtags.map((hashtag) => `#${hashtag}`).join(' ')}
        </Typography>
      </div>
      <div className="openchat__friend-send">
        <Tooltip title="메시지">
          <Send sx={{ width: '20px' }} />
        </Tooltip>
      </div>
    </OpenchatFriendWrap>
  );
}

export default React.memo(OpenchatFriendItem);
