import React, { useEffect, useState, useMemo } from 'react';
import { Box, Button, Container, Grid, Typography } from '@mui/material';
import { MapsUgc } from '@mui/icons-material';
import {
  OpenchatBox,
  OpenchatContainer,
  OpenchatCreateChatBtn,
} from '../../styles/OpenchatStyle';

import OpenchatCategory from '../../components/openchat/list/OpenchatCategory';
import OpenchatCreate from '../../components/openchat/new/OpenchatCreate';
import { privateApi } from '../../libs/axios';
import { UserSimple } from '../../types/User';
import useQueryOpenchats from '../../hooks/useQueryOpenchats';
import {
  filterCateOpenChats,
  filterFriendsNotMe,
} from '../../utils/filterOpenChats';
import { animal, hobby, sports } from '../../types/OpenchatType';
import OpenchatMy from '../../components/openchat/list/OpenchatMy';
import OpenchatFriends from '../../components/openchat/list/OpenchatFriends';
import OpenchatTopAppbar from '../../components/openchat/list/OpenchatTopAppbar';

function Openchat() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [allUsers, setAllUsers] = useState<UserSimple[]>([]);
  const { isQuering, openchats, myOpenChat, friends, hashtags, fetchingData } =
    useQueryOpenchats();

  const myTagChats = useMemo(
    () => filterCateOpenChats(openchats ?? [], hashtags ?? []),
    [openchats],
  );
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

  return (
    <OpenchatContainer isOpenModal={Boolean(selectedId)}>
      <OpenchatTopAppbar />
      <Container sx={{ paddingBottom: '100px' }}>
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
          <Grid item xs={12} sm={12} md={9}>
            <OpenchatBox id="my-chat">
              <Box bgcolor="white" p={2} sx={{ minHeight: '142px' }}>
                <Typography variant="h5" mb={3}>
                  📣 내 오픈채팅방
                </Typography>
                <OpenchatMy isQuering={isQuering} openchats={myOpenChat} />
              </Box>
            </OpenchatBox>
            <OpenchatBox id="my-tag">
              <Box bgcolor="white" p={2} sx={{ minHeight: '142px' }}>
                <Typography variant="h5">🙌 추천 오픈채팅방</Typography>
                <Typography variant="body2" color="GrayText" mt={1} mb={2}>
                  관심사인 {hashtags?.map((tag) => `#${tag}`).join(' ')} 태그의
                  채팅방을 추천드립니다.
                </Typography>
                <OpenchatCategory
                  isQuering={isQuering}
                  openchats={myTagChats}
                />
              </Box>
            </OpenchatBox>
            <OpenchatBox id="hobby">
              <Box bgcolor="white" p={2} sx={{ minHeight: '142px' }}>
                <Typography variant="h5" mb={3}>
                  🎮 취미/문화
                </Typography>
                <OpenchatCategory
                  isQuering={isQuering}
                  openchats={hobbyChats}
                />
              </Box>
            </OpenchatBox>
            <OpenchatBox id="sports">
              <Box bgcolor="white" p={2} sx={{ minHeight: '142px' }}>
                <Typography variant="h5" mb={3}>
                  ⛳ 운동/스포츠
                </Typography>
                <OpenchatCategory
                  isQuering={isQuering}
                  openchats={sportsChats}
                />
              </Box>
            </OpenchatBox>
            <OpenchatBox id="animal">
              <Box bgcolor="white" p={2} sx={{ minHeight: '142px' }}>
                <Typography variant="h5" mb={3}>
                  🐶 동물/식물
                </Typography>
                <OpenchatCategory
                  isQuering={isQuering}
                  openchats={animalChats}
                />
              </Box>
            </OpenchatBox>
          </Grid>
          <Grid item xs={12} sm={12} md={3}>
            <OpenchatBox issticky="sticky">
              <Box bgcolor="white">
                <Typography variant="h5" p={2}>
                  🙌 추천 친구
                </Typography>
                <Typography variant="body2" color="GrayText" mb={2} px={2}>
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
