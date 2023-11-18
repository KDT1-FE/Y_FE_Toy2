/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { CircularProgress, Tooltip, Typography } from '@mui/material';
import { Send } from '@mui/icons-material';
import { useRecoilValue } from 'recoil';
import { UserInfoWithId, UserSimple } from '../../../types/User';
import { OpenchatFriendWrap } from '../../../styles/OpenchatStyle';
import { userState } from '../../../atoms';

interface OpenchatFriendProps {
  friend: UserInfoWithId;
  onClickDm: (chatName: string, userId: string, myId: string) => void;
  creatingId: string;
}

function OpenchatFriendItem({
  friend,
  onClickDm,
  creatingId,
}: OpenchatFriendProps) {
  const userStr = useRecoilValue(userState);
  const userInfo = JSON.parse(userStr) as UserSimple;
  const chatName = [friend.name, userInfo.name].sort().join(',');

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
      <div
        className="openchat__friend-send"
        onClick={() => onClickDm(chatName, friend.id, userInfo.id)}
      >
        {creatingId === friend.id ? (
          <CircularProgress sx={{ width: '14px' }} />
        ) : (
          <Tooltip title="메시지">
            <Send sx={{ width: '20px' }} />
          </Tooltip>
        )}
      </div>
    </OpenchatFriendWrap>
  );
}

export default React.memo(OpenchatFriendItem);
