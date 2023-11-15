import React from 'react';
import { Grid } from '@mui/material';
import { ChatInfoWithId } from '../../../hooks/useQueryOpenchats';
import OpenchatItem from './OpenchatItem';
import OpenchatItemSkeleton from './OpenchatItemSkeleton';
import useMutationParticipate from '../../../hooks/useMutationOpenchatPatchs';

interface OpenchatCategoryProps {
  isQuering: boolean;
  openchats?: ChatInfoWithId[];
}

function OpenchatCategory({ isQuering, openchats }: OpenchatCategoryProps) {
  const count2 = ['skeleton1', 'skeleton2'];
  const { participate } = useMutationParticipate();

  if (!openchats) return <div>채팅방이 없습니다.</div>;
  return (
    <Grid container spacing={2}>
      {!isQuering
        ? openchats.map((openchat) => (
            <OpenchatItem
              key={openchat.id}
              openchat={openchat}
              participate={participate}
            />
          ))
        : count2.map((el) => <OpenchatItemSkeleton key={el} />)}
    </Grid>
  );
}

OpenchatCategory.defaultProps = {
  openchats: null,
};
export default React.memo(OpenchatCategory);
