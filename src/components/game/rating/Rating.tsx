import React, { useState, useEffect } from 'react';
import { Typography } from '@mui/material';
import styled from 'styled-components';
import sorting from './sorting';

const RatingWrapper = styled.div`
  flex: 1;
  display: flex;
  min-width: 300px;
  height: 100%;
  flex-direction: column;
  align-items: center;
  padding: 1.6rem 0;
`;

export default function Rating() {
  const [peoples, setPeoples] = useState([
    { id: 'dd', correct: 2 },
    { id: 'bb', correct: 2 },
    { id: 'cc', correct: 15 },
    { id: 'aa', correct: 15 },
  ]);
  const [finish, setFinish] = useState(0);
  useEffect(() => {
    setPeoples(sorting(peoples));
    setFinish(1);
  }, [peoples]);

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
        peoples.slice(0, 10).map((el, i) => (
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
            {i + 1}. {el.id}
          </Typography>
        ))
      ) : (
        <div>X</div>
      )}
    </RatingWrapper>
  );
}
