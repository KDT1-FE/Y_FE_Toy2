import React from 'react';
import { Grid, Typography } from '@mui/material';
import { Person } from '@mui/icons-material';
import { OpenchatRoom } from '../../styles/OpenchatStyle';
import OpenchatAvatar from './OpenchatAvatar';
import { Openchat } from '../../types/Openchat';

interface OpenchatMyItemProps {
  openchat: Openchat;
}

function OpenchatMyItem({ openchat }: OpenchatMyItemProps) {
  return (
    <Grid item xs={12} sm={6}>
      <OpenchatRoom>
        <div className="openchat__room-avatar">
          <OpenchatAvatar src={openchat.image} alt={openchat.name} />
        </div>
        <div className="openchat__room-info">
          <div className="openchat__room-desc">
            <Typography variant="body1">{openchat.name}</Typography>
            <Typography variant="body1">
              {openchat.latestMessage?.text ?? '이전 메시지'}
            </Typography>
            <Typography variant="body2" color="GrayText">
              <Person sx={{ width: '1rem', verticalAlign: '-6px' }} />{' '}
              {openchat.users.map((user) => user.username).join(',')}
            </Typography>
          </div>
          <Typography
            variant="body2"
            color="GrayText"
            className="openchat__room-lastdate"
          >
            {openchat.latestMessage?.createAt.toDateString() ?? '11월 11일'}
          </Typography>
        </div>
      </OpenchatRoom>
    </Grid>
  );
}

export default React.memo(OpenchatMyItem);
