import React from 'react';
import { Box } from '@mui/material';
import { User } from '../../../types/User';
import OpenchatInviteFriendItem from './OpenchatInviteFriendItem';

interface OpenchatInviteFriendsProps {
  allUsers: User[];
  onClickSelectBtn: (value: string) => void;
  selectedIds: string[];
}

function OpenchatInviteFriends({
  allUsers,
  onClickSelectBtn,
  selectedIds,
}: OpenchatInviteFriendsProps) {
  return (
    <Box sx={{ height: '100%' }}>
      {allUsers.map((user) => (
        <OpenchatInviteFriendItem
          key={user.id}
          user={user}
          onClickSelectBtn={onClickSelectBtn}
          selectedIds={selectedIds}
        />
      ))}
    </Box>
  );
}

export default OpenchatInviteFriends;
