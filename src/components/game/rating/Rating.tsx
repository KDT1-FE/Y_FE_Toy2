import React, { useState, useEffect, Dispatch } from 'react';
import { Typography } from '@mui/material';
import styled from 'styled-components';
import sorting from './sorting';
import { getRate, updateData } from '../../../utils/utils';

const RatingWrapper = styled.div`
  flex: 1;
  display: flex;
  min-width: 300px;
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

export type PeoplesType = {
  peoples: { name: string; correct: number }[];
  setPeoples: Dispatch<
    React.SetStateAction<{ name: string; correct: number }[]>
  >;
};
export type RateType = {
  rate: number;
  setRate: Dispatch<React.SetStateAction<number>>;
};
export type PropsType = PeoplesType & RateType;

export default function Rating({
  peoples,
  setPeoples,
  rate,
  setRate,
}: PropsType) {
  const [finish, setFinish] = useState(0);
  useEffect(() => {
    getRate(setPeoples, 'yamyamssi', setRate);
    setFinish(1);
    console.log(rate);
  }, []);
  useEffect(() => {
    if (rate !== 0) {
      updateData('rnffjt', { correct: rate });
      getRate(setPeoples, 'yamyamssi', setRate);
    }
  }, [rate]);

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
        {{ finish } ? (
          sorting(peoples).map((el, i) => (
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
              {i + 1}. {el.name}
            </Typography>
          ))
        ) : (
          <div>X</div>
        )}
      </Ratings>
    </RatingWrapper>
  );
}
