/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Container,
  Stack,
  Typography,
} from '@mui/material';
import { MapsUgc } from '@mui/icons-material';
import {
  OpenchatAppbar,
  OpenchatBox,
  OpenchatContainer,
  OpenchatCreateChatBtn,
} from '../styles/OpenchatStyle';

import OpenchatCategory from '../components/openchat/OpenchatCategory';
import OpenchatCreate from '../components/openchat/OpenchatCreate';
import { privateApi } from '../libs/axios';
import { UserSimple } from '../types/User';
import useQueryOpenchats from '../hooks/useQueryOpenchats';

function Openchat() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [allUsers, setAllUsers] = useState<UserSimple[]>([]);
  const { isQuering, openchats } = useQueryOpenchats();

  useEffect(() => {
    if (selectedId) {
      (async () => {
        const res = await privateApi.get('users');
        setAllUsers(res.data);
      })();
    }
  }, [selectedId]);

  if (isQuering) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#f5f5f5',
          height: '100vh',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <OpenchatContainer isOpenModal={Boolean(selectedId)}>
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
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }} pt={3}>
          <OpenchatCreateChatBtn
            layoutId="newchat-modal"
            onClick={() => setSelectedId('newchat-modal')}
          >
            <Button variant="contained" size="large" startIcon={<MapsUgc />}>
              오픈채팅 만들기
            </Button>
          </OpenchatCreateChatBtn>
        </Box>
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
      <OpenchatCreate
        selectedId={selectedId}
        setSelectedId={setSelectedId}
        allUsers={allUsers}
      />
    </OpenchatContainer>
  );
}

export default Openchat;
