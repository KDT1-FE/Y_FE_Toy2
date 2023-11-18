/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Grid, Typography } from '@mui/material';
import { Person } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { OpenchatRoom } from '../../../styles/OpenchatStyle';
import OpenchatAvatar from '../common/OpenchatAvatar';
import { Openchat } from '../../../types/OpenchatType';
import { formatDate } from '../../../utils/formatDate';

interface OpenchatMyItemProps {
  openchat: Openchat;
}

function OpenchatMyItem({ openchat }: OpenchatMyItemProps) {
  dayjs.extend(relativeTime);
  const receivedTime = dayjs(openchat.latestMessage?.createdAt);
  const relativeTimeText = receivedTime.fromNow();

  return (
    <Grid item xs={12} sm={6}>
      <Link to={openchat.id}>
        <OpenchatRoom>
          <div className="openchat__room-avatar">
            <OpenchatAvatar src={openchat.image} alt={openchat.name} />
          </div>
          <div className="openchat__room-info">
            <div className="openchat__room-desc">
              <Typography variant="body1" className="overflow-ellipsis">
                {openchat.name}
              </Typography>
              <Typography
                variant="body2"
                color="GrayText"
                className="overflow-ellipsis"
              >
                {openchat.latestMessage?.text ?? '이전 메시지가 없습니다.'}
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
              {relativeTimeText}
            </Typography>
          </div>
        </OpenchatRoom>
      </Link>
    </Grid>
  );
}

export default React.memo(OpenchatMyItem);
