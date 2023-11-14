import React from 'react';
import { Box, Tooltip, Typography } from '@mui/material';
import { AddCircleOutline, RemoveCircleOutline } from '@mui/icons-material';
import { OpenchatFriendWrap } from '../../../styles/OpenchatStyle';
import { User } from '../../../types/User';

interface OpenchatInviteFriendItemProps {
  user: User;
  onClickSelectBtn: (value: string) => void;
  selectedIds: string[];
}

function OpenchatInviteFriendItem({
  user,
  onClickSelectBtn,
  selectedIds,
}: OpenchatInviteFriendItemProps) {
  const isSeleted = selectedIds.includes(user.id);

  return (
    <OpenchatFriendWrap
      sx={{
        backgroundColor: isSeleted ? '#d7d7d7' : '#fff',
        transition: 'background-color 0.3s',
      }}
    >
      <div className="openchat__friend-img">
        <img src={user.picture} alt={user.name} />
      </div>
      <div className="openchat__friend-text">
        <Typography variant="body1" className="openchat__friend-name">
          {user.name} ({user.id})
        </Typography>
      </div>
      <Box
        className="openchat__friend-send"
        onClick={() => onClickSelectBtn(user.id)}
      >
        <Tooltip title={isSeleted ? '취소하기' : '초대하기'}>
          {isSeleted ? (
            <RemoveCircleOutline sx={{ width: '30px' }} />
          ) : (
            <AddCircleOutline sx={{ width: '30px' }} />
          )}
        </Tooltip>
      </Box>
    </OpenchatFriendWrap>
  );
}

export default OpenchatInviteFriendItem;
