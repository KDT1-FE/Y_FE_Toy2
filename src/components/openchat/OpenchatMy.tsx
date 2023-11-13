import React from 'react';
import { Grid } from '@mui/material';
import OpenchatMyItem from './OpenchatMyItem';
import { Openchat } from '../../types/Openchat';
import OpenchatItemSkeleton from './OpenchatItemSkeleton';

interface OpenchatMyProps {
  isQuering: boolean;
  openchats?: Openchat[];
}

function OpenchatMy({ isQuering, openchats }: OpenchatMyProps) {
  const count2 = new Array(2).fill(0);
  if (!openchats) return <div>채팅방이 없습니다.</div>;
  return (
    <Grid container spacing={2}>
      {!isQuering
        ? openchats.map((openchat) => (
            <OpenchatMyItem key={openchat.id} openchat={openchat} />
          ))
        : count2.map(() => <OpenchatItemSkeleton />)}
    </Grid>
  );
}

OpenchatMy.defaultProps = {
  openchats: null,
};

export default React.memo(OpenchatMy);
