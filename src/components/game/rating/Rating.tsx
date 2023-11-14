import React from 'react';
import { Typography } from '@mui/material';
import styled from 'styled-components';
import sorting from './sorting';
import { PeoplesType } from '../gameType';

const RatingWrapper = styled.div`
  flex: 1;
  display: flex;
  min-width: 350px;
  height: calc(100vh - 80px);
  flex-direction: column;
  align-items: center;
  padding: 2.5rem 0;
  box-sizing: border-box;
`;
const Ratings = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export type PropsType = Pick<PeoplesType, 'peoples'>;

export default function Rating({ peoples }: PropsType) {
  return (
    <RatingWrapper>
      <Typography
        variant="h1"
        sx={{
          fontSize: '2.5rem',
          color: '#457b9d',
          mt: 2,
          mb: 4,
          fontFamily: 'Bungee',
          margin: 0,
          padding: '0 0 2.5rem 0',
        }}
      >
        Rating!
      </Typography>
      <Ratings>
        {sorting(peoples).map((el, i) => {
          const userName =
            el.name.length > 9 ? el.name.substring(0, 9) : el.name;
          return (
            <Typography
              variant="h1"
              sx={{
                fontSize: '2rem',
                color: '#1d3557',
                mt: 2,
                mb: 4,
                fontFamily: 'Bungee',
              }}
            >
              {i + 1}. {userName}
            </Typography>
          );
        })}
      </Ratings>
    </RatingWrapper>
  );
}
