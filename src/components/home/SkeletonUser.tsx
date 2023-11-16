import React from 'react';
import { Skeleton } from '@mui/material';
import * as S from '../../styles/home/User.styled';

function SkeletonUser() {
  return (
    <S.Card>
      <S.Image>
        <Skeleton variant="circular" width="100%" height="100%" />
      </S.Image>
      <S.Info>
        <S.User>
          <S.Name>
            <Skeleton variant="rectangular" width={100} />
          </S.Name>

          <Skeleton variant="text" width={60} height={40} />
        </S.User>
        <S.Hashtags>
          {new Array(5).fill(0).map((_, index: React.Key) => (
            <Skeleton
              variant="text"
              width={30}
              height={34}
              key={index}
              style={{
                marginRight: '8px',
                padding: '20px 30px',
                borderRadius: '17px',
              }}
            />
          ))}
        </S.Hashtags>
        <S.Intro>
          <Skeleton variant="text" width={300} />
        </S.Intro>
      </S.Info>
    </S.Card>
  );
}

export default SkeletonUser;
