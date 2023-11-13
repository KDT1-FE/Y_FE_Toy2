import React from 'react';
import { Grid } from '@mui/material';
import OpenchatMyItem from './OpenchatMyItem';
import { Openchat } from '../../types/Openchat';

interface OpenchatMyProps {
  openchats?: Openchat[];
}

function OpenchatMy({ openchats }: OpenchatMyProps) {
  if (!openchats) return <div>채팅방이 없습니다.</div>;
  return (
    <Grid container spacing={2}>
      {openchats.map((openchat) => (
        <OpenchatMyItem key={openchat.id} openchat={openchat} />
      ))}
    </Grid>
  );
}

OpenchatMy.defaultProps = {
  openchats: null,
};

export default React.memo(OpenchatMy);
