import React from 'react';
import { Box, Typography } from '@mui/material';
import { Add } from '@mui/icons-material';
import {
  OpenchatFriendWrap,
  OpenchatNavUserItemLi,
} from '../../../styles/OpenchatStyle';

interface OpenchatNavInviteProps {
  toggleModalOpen: (state: string | null) => void;
}

function OpenchatNavInvite({ toggleModalOpen }: OpenchatNavInviteProps) {
  return (
    <OpenchatNavUserItemLi onClick={() => toggleModalOpen('true')}>
      <OpenchatFriendWrap sx={{ width: '100%' }}>
        <div className="openchat__friend-img">
          <Box
            sx={{
              width: '48px',
              height: '48px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Add />
          </Box>
        </div>
        <div className="openchat__friend-text">
          <Typography variant="body1" className="openchat__friend-name">
            친구 초대
          </Typography>
        </div>
      </OpenchatFriendWrap>
    </OpenchatNavUserItemLi>
  );
}

export default OpenchatNavInvite;
