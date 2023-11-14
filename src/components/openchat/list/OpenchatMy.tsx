import React from 'react';
import { Grid } from '@mui/material';
import OpenchatMyItem from './OpenchatMyItem';
import { Openchat } from '../../../types/Openchat';
import OpenchatItemSkeleton from './OpenchatItemSkeleton';

interface OpenchatMyProps {
  isQuering: boolean;
  openchats?: Openchat[];
}

function OpenchatMy({ isQuering, openchats }: OpenchatMyProps) {
  const count2 = ['skeleton1', 'skeleton2'];
  if (!openchats) return <div>채팅방이 없습니다.</div>;
  return (
    <Grid container spacing={2}>
      {!isQuering
        ? openchats.map((openchat) => (
            <OpenchatMyItem key={openchat.id} openchat={openchat} />
          ))
        : count2.map((el) => <OpenchatItemSkeleton key={el} />)}
    </Grid>
  );
}

OpenchatMy.defaultProps = {
  openchats: null,
};

export default React.memo(OpenchatMy);
