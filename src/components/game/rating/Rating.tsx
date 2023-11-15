import React from 'react';
import styled from 'styled-components';
import { Typography } from '@mui/material';
import sorting from './sorting';
import { PeoplesType } from '../../../types/gameType';

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
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;
const CorrectScore = styled.div`
  width: 150px;
  position: absolute;
  opacity: 0;
  bottom: 33px;
  right: -155px;
  transition: 0.2s all;
`;
const RateBox = styled.div`
  display: flex;
  position: relative;

  &:hover ${CorrectScore} {
    opacity: 1;
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
        Ranking
      </Typography>
      <Ratings>
        {sorting(peoples).map((el, i) => {
          const userName =
            el.name.length > 9 ? el.name.substring(0, 9) : el.name;
          let userRate: string;
          switch (i + 1) {
            case 1:
              userRate = '🥇';
              break;
            case 2:
              userRate = '🥈';
              break;
            case 3:
              userRate = '🥉';
              break;
            default:
              userRate = `${i + 1}.`;
          }
          return (
            <RateBox key={i}>
              <Typography
                variant="h1"
                sx={{
                  fontSize: '2rem',
                  color: '#1d3557',
                  mt: 2,
                  mb: 4,
                  fontFamily: ['Bungee', 'Black Han Sans'],
                }}
              >
                {userRate} {userName}
              </Typography>
              <CorrectScore>
                <Typography
                  variant="h5"
                  sx={{
                    color: '#1d3557',
                    fontFamily: ['Bungee', 'Black Han Sans'],
                  }}
                >
                  {el.correct}
                </Typography>
              </CorrectScore>
            </RateBox>
          );
        })}
      </Ratings>
    </RatingWrapper>
  );
}
