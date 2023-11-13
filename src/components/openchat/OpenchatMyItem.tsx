import React from 'react';
import { Grid, Typography } from '@mui/material';
import { OpenchatRoom } from '../../styles/OpenchatStyle';
import { Openchat } from '../../hooks/useQueryOpenchats';
import OpenchatAvatar from './OpenchatAvatar';

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
              {openchat.latestMessage?.text ?? ''}
            </Typography>
            <Typography variant="body2">
              {openchat.latestMessage?.createAt.toDateString()}
            </Typography>
          </div>
        </div>
      </OpenchatRoom>
    </Grid>
  );
}

export default React.memo(OpenchatMyItem);
