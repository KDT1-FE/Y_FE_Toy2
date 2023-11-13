import React, { useState, useEffect, Dispatch } from 'react';
import { Typography } from '@mui/material';
import styled from 'styled-components';
import sorting from './sorting';
import { getRate, updateData } from '../../../utils/utils';

const RatingWrapper = styled.div`
  flex: 1;
  display: flex;
  min-width: 300px;
  height: 100%;
  flex-direction: column;
  align-items: center;
  padding: 1.6rem 0;
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
    getRate(setPeoples, '백상원', setRate);
    setFinish(1);
  }, []);
  useEffect(() => {
    if (rate !== 0) {
      updateData('qorrla5433', { correct: rate });
      getRate(setPeoples, '백상원', setRate);
    }
  }, [rate]);

  return (
    <RatingWrapper>
      <Typography
        variant="h1"
        sx={{
          fontSize: '2rem',
          color: '#457b9d',
          mt: 2,
          mb: 4,
          fontFamily: 'Bungee',
        }}
      >
        Rating!
      </Typography>
      {{ finish } ? (
        sorting(peoples)
          .slice(0, 10)
          .map((el, i) => (
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
    </RatingWrapper>
  );
}
