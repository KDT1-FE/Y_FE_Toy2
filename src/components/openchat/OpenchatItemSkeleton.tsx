import React from 'react';
import { Grid, Skeleton } from '@mui/material';
import { OpenchatRoom } from '../../styles/OpenchatStyle';

function OpenchatItemSkeleton() {
  return (
    <Grid item xs={12} sm={6}>
      <OpenchatRoom>
        <div className="openchat__room-avatar">
          <Skeleton variant="circular" width={52} height={52} />
        </div>
        <div className="openchat__room-info">
          <div className="openchat__room-desc">
            <Skeleton variant="rounded" width={200} height={17} />
            <Skeleton
              variant="rounded"
              width={180}
              height={15}
              sx={{ margin: '3px 0' }}
            />
            <Skeleton variant="rounded" width={140} height={21} />
          </div>
          <Skeleton width={60} height={60} />
        </div>
      </OpenchatRoom>
    </Grid>
  );
}

export default OpenchatItemSkeleton;
