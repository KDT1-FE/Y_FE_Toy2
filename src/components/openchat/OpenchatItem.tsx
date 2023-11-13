import React from 'react';
import { Button, Grid, Typography } from '@mui/material';
import { OpenchatRoom } from '../../styles/OpenchatStyle';
import { ChatInfoWithId } from '../../hooks/useQueryOpenchats';
import OpenchatAvatar from './OpenchatAvatar';

interface OpenchatCategoryProps {
  openchat: ChatInfoWithId;
}

function OpenchatItem({ openchat }: OpenchatCategoryProps) {
  return (
    <Grid item xs={12} sm={6}>
      <OpenchatRoom>
        <div className="openchat__room-avatar">
          <OpenchatAvatar src={openchat.image} alt={openchat.name} />
        </div>
        <div className="openchat__room-info">
          <div className="openchat__room-desc">
            <Typography variant="body1">{openchat.name}</Typography>
            <Typography variant="body2" color="GrayText" mt={1}>
              {openchat.hashtags.map((hashtag) => `#${hashtag}`).join(' ')}
            </Typography>
          </div>
          <Button
            variant="contained"
            className="openchat__room-btn"
            sx={{
              bgcolor: 'secondary.main',
              color: 'black',
              ':hover': { bgcolor: 'secondary.light' },
            }}
          >
            참여
          </Button>
        </div>
      </OpenchatRoom>
    </Grid>
  );
}

export default React.memo(OpenchatItem);
