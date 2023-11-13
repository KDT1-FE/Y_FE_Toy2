import React from 'react';
import { Grid } from '@mui/material';
import { ChatInfoWithId } from '../../hooks/useQueryOpenchats';
import OpenchatItem from './OpenchatItem';
import OpenchatItemSkeleton from './OpenchatItemSkeleton';

interface OpenchatCategoryProps {
  isQuering: boolean;
  openchats?: ChatInfoWithId[];
}

function OpenchatCategory({ isQuering, openchats }: OpenchatCategoryProps) {
  const count2 = new Array(2).fill(0);
  if (!openchats) return <div>채팅방이 없습니다.</div>;
  return (
    <Grid container spacing={2}>
      {!isQuering
        ? openchats.map((openchat) => (
            <OpenchatItem key={openchat.id} openchat={openchat} />
          ))
        : count2.map(() => <OpenchatItemSkeleton />)}
    </Grid>
  );
}

OpenchatCategory.defaultProps = {
  openchats: null,
};
export default React.memo(OpenchatCategory);
