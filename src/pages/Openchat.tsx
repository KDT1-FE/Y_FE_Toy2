import React from 'react';
import { Box, Chip, Container, Stack, Typography } from '@mui/material';
import {
  OpenchatAppbar,
  OpenchatBox,
  OpenchatContainer,
} from '../styles/OpenchatStyle';
import OpenchatCategory from '../components/openchat/OpenchatCategory';

function Openchat() {
  return (
    <OpenchatContainer>
      <OpenchatAppbar id="openchat-appbar">
        <div className="scroll-box">
          <Stack direction="row" spacing={1}>
            <Chip
              label="내 오픈채팅방"
              component="a"
              href="#my-chat"
              clickable
            />
            <Chip label="#취미/문화" component="a" href="#hobby" clickable />
            <Chip label="#운동/스포츠" component="a" href="#sports" clickable />
            <Chip label="#동물/식물" component="a" href="#animal" clickable />
          </Stack>
        </div>
      </OpenchatAppbar>
      <Container>
        <OpenchatBox id="my-chat">
          <Box bgcolor="white" p={2} sx={{ minHeight: '400px' }}>
            <Typography variant="h5" mb={3}>
              📣 내 오픈채팅방
            </Typography>
            <OpenchatCategory isMyChat />
          </Box>
        </OpenchatBox>
        <OpenchatBox id="hobby">
          <Box bgcolor="white" p={2} sx={{ minHeight: '400px' }}>
            <Typography variant="h5" mb={3}>
              🎮 취미/문화
            </Typography>
            <OpenchatCategory />
          </Box>
        </OpenchatBox>
        <OpenchatBox id="sports">
          <Box bgcolor="white" p={2} sx={{ minHeight: '400px' }}>
            <Typography variant="h5" mb={3}>
              ⛳ 운동/스포츠
            </Typography>
            <OpenchatCategory />
          </Box>
        </OpenchatBox>
        <OpenchatBox id="animal">
          <Box bgcolor="white" p={2} sx={{ minHeight: '400px' }}>
            <Typography variant="h5" mb={3}>
              🐶 동물/식물
            </Typography>
            <OpenchatCategory />
          </Box>
        </OpenchatBox>
      </Container>
    </OpenchatContainer>
  );
}

export default Openchat;
