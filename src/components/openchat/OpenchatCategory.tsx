import React from 'react';
import { Grid } from '@mui/material';
import { ChatInfoWithId } from '../../hooks/useQueryOpenchats';
import OpenchatItem from './OpenchatItem';

interface OpenchatCategoryProps {
  openchats?: ChatInfoWithId[];
}

function OpenchatCategory({ openchats }: OpenchatCategoryProps) {
  if (!openchats) return <div>채팅방이 없습니다.</div>;
  return (
    <Grid container spacing={2}>
      {openchats.map((openchat) => (
        <OpenchatItem key={openchat.id} openchat={openchat} />
      ))}
    </Grid>
  );
}

OpenchatCategory.defaultProps = {
  openchats: null,
};
export default React.memo(OpenchatCategory);
