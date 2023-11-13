/* eslint-disable no-console */
import React, { useEffect, useState, useMemo } from 'react';
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Container,
  Grid,
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
import {
  filterCateOpenChats,
  filterFriendsNotMe,
} from '../utils/filterOpenChats';
import { animal, hobby, sports } from '../types/Openchat';
import OpenchatMy from '../components/openchat/OpenchatMy';
import OpenchatFriends from '../components/openchat/OpenchatFriends';

function Openchat() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [allUsers, setAllUsers] = useState<UserSimple[]>([]);
  const { isQuering, openchats, myOpenChat, friends, hashtags, fetchingData } =
    useQueryOpenchats();

  const hobbyChats = useMemo(
    () => filterCateOpenChats(openchats ?? [], hobby),
    [openchats],
  );
  const sportsChats = useMemo(
    () => filterCateOpenChats(openchats ?? [], sports),
    [openchats],
  );
  const animalChats = useMemo(
    () => filterCateOpenChats(openchats ?? [], animal),
    [openchats],
  );

  // 나를 제외한 친구목록
  const friendsExcludMe = useMemo(
    () => filterFriendsNotMe(friends ?? []),
    [friends],
  );

  useEffect(() => {
    fetchingData();
  }, [fetchingData]);

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
        <Grid container spacing={2}>
          <Grid item sm={12} md={9}>
            <OpenchatBox id="my-chat">
              <Box bgcolor="white" p={2} sx={{ minHeight: '240px' }}>
                <Typography variant="h5" mb={3}>
                  📣 내 오픈채팅방
                </Typography>
                <OpenchatMy openchats={myOpenChat} />
              </Box>
            </OpenchatBox>
            <OpenchatBox id="hobby">
              <Box bgcolor="white" p={2} sx={{ minHeight: '240px' }}>
                <Typography variant="h5" mb={3}>
                  🎮 취미/문화
                </Typography>
                <OpenchatCategory openchats={hobbyChats} />
              </Box>
            </OpenchatBox>
            <OpenchatBox id="sports">
              <Box bgcolor="white" p={2} sx={{ minHeight: '240px' }}>
                <Typography variant="h5" mb={3}>
                  ⛳ 운동/스포츠
                </Typography>
                <OpenchatCategory openchats={sportsChats} />
              </Box>
            </OpenchatBox>
            <OpenchatBox id="animal">
              <Box bgcolor="white" p={2} sx={{ minHeight: '240px' }}>
                <Typography variant="h5" mb={3}>
                  🐶 동물/식물
                </Typography>
                <OpenchatCategory openchats={animalChats} />
              </Box>
            </OpenchatBox>
          </Grid>
          <Grid item sm={12} md={3}>
            <OpenchatBox
              sx={{ position: 'sticky', top: 0, paddingTop: '58px' }}
            >
              <Box bgcolor="white" p={2}>
                <Typography variant="h5">🙌 추천 친구</Typography>
                <Typography variant="body2" color="GrayText" mt={1} mb={2}>
                  비슷한 관심사를 가지고 있는 친구
                </Typography>
                {friends && <OpenchatFriends friends={friendsExcludMe} />}
              </Box>
            </OpenchatBox>
          </Grid>
        </Grid>
      </Container>
      <OpenchatCreate
        selectedId={selectedId}
        setSelectedId={setSelectedId}
        allUsers={allUsers}
        fetchingData={fetchingData}
      />
    </OpenchatContainer>
  );
}

export default Openchat;
