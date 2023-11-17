import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { TimeType } from '../../../../types/gameType';

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
          // 제한시간 5초를 구현 하기 위해서는 수치 상으로 * 20을 해야하지만 28.5로 했을 때 화면 상에서 게이지가 5초에 가장 근접했음
          width: `${(time - 1) * 28.5}%`,
        }}
        transition={{
          ease: 'linear',
          duration: 1,
        }}
      />
    </Container>
  );
}
