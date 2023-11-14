import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { TimeType } from '../../gameType';

type PropsType = Pick<TimeType, 'time'>;

const Container = styled.div`
  width: 80%;
  height: 10px;
  display: flex;
  justify-content: flex-start;
`;

export default function TimeGauge({ time }: PropsType) {
  return (
    <Container>
      <motion.div
        style={{ backgroundColor: 'red', height: '10px', borderRadius: '5px' }}
        initial={{
          width: '100%',
        }}
        animate={{
          width: `${(time - 1) * 25}%`,
        }}
        transition={{
          ease: 'linear',
          duration: 1,
        }}
      />
    </Container>
  );
}
