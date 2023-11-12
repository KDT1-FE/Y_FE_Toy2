import React from 'react';
import { Grid } from '@mui/material';
import { ChatInfoWithId, Openchat } from '../../hooks/useQueryOpenchats';
import OpenchatItem from './OpenchatItem';

interface OpenchatCategoryProps {
  isMyChat?: boolean;
  openchats?: Openchat[] | ChatInfoWithId[];
}

function OpenchatCategory({ isMyChat, openchats }: OpenchatCategoryProps) {
  if (!openchats) return <div>채팅방이 없습니다.</div>;
  return (
    <Grid container spacing={2}>
      {openchats.map((openchat) => (
        <OpenchatItem
          key={openchat.id}
          isMyChat={Boolean(isMyChat)}
          openchat={openchat}
        />
      ))}
    </Grid>
  );
}

OpenchatCategory.defaultProps = {
  isMyChat: false,
  openchats: null,
};
export default OpenchatCategory;
