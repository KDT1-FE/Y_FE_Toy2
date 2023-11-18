import React from 'react';
import { Chip, Stack } from '@mui/material';
import { OpenchatAppbar } from '../../../styles/OpenchatStyle';

function OpenchatTopAppbar() {
  return (
    <OpenchatAppbar id="openchat-appbar">
      <div className="scroll-box">
        <Stack direction="row" spacing={1}>
          <Chip label="내 오픈채팅방" component="a" href="#my-chat" clickable />
          <Chip
            label="추천"
            component="a"
            href="#my-tag"
            clickable
            variant="outlined"
          />
          <Chip
            label="#취미/문화"
            component="a"
            href="#hobby"
            clickable
            variant="outlined"
          />
          <Chip
            label="#운동/스포츠"
            component="a"
            href="#sports"
            clickable
            variant="outlined"
          />
          <Chip
            label="#동물/식물"
            component="a"
            href="#animal"
            clickable
            variant="outlined"
          />
        </Stack>
      </div>
    </OpenchatAppbar>
  );
}

export default OpenchatTopAppbar;
