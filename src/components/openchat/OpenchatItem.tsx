import { Button, Grid, Typography } from '@mui/material';
import React from 'react';
import { OpenchatRoom } from '../../styles/OpenchatStyle';
import { ChatInfoWithId, Openchat } from '../../hooks/useQueryOpenchats';
import OpenchatAvatar from './OpenchatAvatar';

interface OpenchatCategoryProps {
  isMyChat: boolean;
  openchat: Openchat | ChatInfoWithId;
}

function OpenchatItem({ isMyChat, openchat }: OpenchatCategoryProps) {
  return (
    <Grid item xs={12} sm={6}>
      <OpenchatRoom>
        <OpenchatAvatar src={openchat.image} alt={openchat.name} />
        <div className="openchat__room-info">
          <div className="openchat__room-desc">
            <Typography variant="body1">{openchat.name}</Typography>
            <Typography variant="body2" color="GrayText">
              {openchat.hashtags.map((hashtag) => `#${hashtag}`).join(' ')}
            </Typography>
          </div>
          {isMyChat ? (
            <div>
              {/* <Typography variant="body1">
                {openchat.latestMessage?.text : ""}
              </Typography>
              <Typography variant="body2">
                {openchat.latestMessage?.createAt.toDateString()}
              </Typography> */}
            </div>
          ) : (
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
          )}
        </div>
      </OpenchatRoom>
    </Grid>
  );
}

export default OpenchatItem;
