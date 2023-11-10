import React from 'react';
import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Grid,
  Typography,
} from '@mui/material';
import { OpenchatRoom } from '../../styles/OpenchatStyle';
import sliceText from '../../utils/textSlice';

interface OpenchatCategoryProps {
  isMyChat?: boolean;
}

function OpenchatCategory({ isMyChat }: OpenchatCategoryProps) {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <OpenchatRoom>
          <AvatarGroup max={4} className="openchat__room-avatar">
            <Avatar alt="Remy Sharp" />
            <Avatar alt="Travis Howard" />
            <Avatar alt="Cindy Baker" />
            <Avatar alt="Agnes Walker" />
            <Avatar alt="Trevor Henderson" />
          </AvatarGroup>
          <div className="openchat__room-info">
            <div className="openchat__room-desc">
              <Typography variant="body1">오늘 운동 완료</Typography>
              <Typography variant="body2" color="GrayText">
                #운동 #러닝
              </Typography>
            </div>
            {!isMyChat && (
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
      <Grid item xs={12} sm={6}>
        <OpenchatRoom>
          <AvatarGroup max={4} className="openchat__room-avatar">
            <Avatar alt="Remy Sharp" />
            <Avatar alt="Travis Howard" />
            <Avatar alt="Cindy Baker" />
            <Avatar alt="Agnes Walker" />
            <Avatar alt="Trevor Henderson" />
          </AvatarGroup>
          <div className="openchat__room-info">
            <div className="openchat__room-desc">
              <Typography variant="body1">오늘 운동 완료2</Typography>
              <Typography variant="body2" color="GrayText">
                #운동 #러닝
              </Typography>
            </div>
            {!isMyChat && (
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
      <Grid item xs={12} sm={6}>
        <OpenchatRoom>
          <AvatarGroup max={4} className="openchat__room-avatar">
            <Avatar alt="Remy Sharp" />
            <Avatar alt="Travis Howard" />
            <Avatar alt="Cindy Baker" />
            <Avatar alt="Agnes Walker" />
            <Avatar alt="Trevor Henderson" />
          </AvatarGroup>
          <div className="openchat__room-info">
            <div className="openchat__room-desc">
              <Typography variant="body1">
                {sliceText('[ 소모임 ] 영화 보기, OO구 영화모임')}
              </Typography>
              <Typography variant="body2" color="GrayText">
                #영화감상
              </Typography>
            </div>
            {!isMyChat && (
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
      <Grid item xs={12} sm={6}>
        <OpenchatRoom>
          <AvatarGroup max={4} className="openchat__room-avatar">
            <Avatar alt="Remy Sharp" />
            <Avatar alt="Travis Howard" />
            <Avatar alt="Cindy Baker" />
            <Avatar alt="Agnes Walker" />
            <Avatar alt="Trevor Henderson" />
          </AvatarGroup>
          <div className="openchat__room-info">
            <div className="openchat__room-desc">
              <Typography variant="body1">
                {sliceText('[ 소모임 ] 영화 보기, XX구 영화모임')}
              </Typography>
              <Typography variant="body2" color="GrayText">
                #영화감상
              </Typography>
            </div>
            {!isMyChat && (
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
      <Grid item xs={12} sm={6}>
        <OpenchatRoom>
          <AvatarGroup max={4} className="openchat__room-avatar">
            <Avatar alt="Remy Sharp" />
            <Avatar alt="Travis Howard" />
            <Avatar alt="Cindy Baker" />
            <Avatar alt="Agnes Walker" />
            <Avatar alt="Trevor Henderson" />
          </AvatarGroup>
          <div className="openchat__room-info">
            <div className="openchat__room-desc">
              <Typography variant="body1">천하제일 강아지 자랑🐶</Typography>
              <Typography variant="body2" color="GrayText">
                #강아지
              </Typography>
            </div>
            {!isMyChat && (
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
      <Grid item xs={12} sm={6}>
        <OpenchatRoom>
          <AvatarGroup max={4} className="openchat__room-avatar">
            <Avatar alt="Remy Sharp" />
            <Avatar alt="Travis Howard" />
            <Avatar alt="Cindy Baker" />
            <Avatar alt="Agnes Walker" />
            <Avatar alt="Trevor Henderson" />
          </AvatarGroup>
          <div className="openchat__room-info">
            <div className="openchat__room-desc">
              <Typography variant="body1">천하제일 고양이 자랑😺</Typography>
              <Typography variant="body2" color="GrayText">
                #강아지
              </Typography>
            </div>
            {!isMyChat && (
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
    </Grid>
  );
}

OpenchatCategory.defaultProps = {
  isMyChat: false,
};
export default OpenchatCategory;
